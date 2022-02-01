/*
 * graphics-playground
 * geo-fun.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import Linker from '../model/linker';
import XMouse from '../model/x-mouse';
import {Line, Vec2, Geometry} from '../model/x-geo';
import XGraph from '../model/x-graph';
import XMath from '../model/x-math';
import RCX from '../model/render-context';
import BaseView from './base-view';


export default class GeoFun extends BaseView {
	
	rotation = 0;
	
	
	onDraw() {
		
		const {now, delta, canvas, ctx, styler, cW, cH, mPos} = RCX;
		const {drawLines} = XGraph;
		
		// box lines
		let lines = this.xRectangle();
		
		// mouse related - rotating lines
		let xLines = this.rotatingLines(lines);
		
		// draw
		styler.color = '#e8e745';
		drawLines(lines);
		styler.color = '#cef2fa';
		drawLines(xLines);
	}
	
	
	xRectangle() {
		const {cW, cH} = RCX;
		let x1 = cW * 0.2;
		let x2 = cW * 0.8;
		let y1 = cH * 0.2;
		let y2 = cH * 0.8;
		let sp = 20;
		return [
			// top
			new Line(new Vec2(x1 + sp, y1 - sp), new Vec2(x2 - sp, y1 - sp)),
			//new Line(new Vec2(x1 + sp, y1 - sp), new Vec2(x2 - sp, y1 - sp)),
			
			// left
			new Line(new Vec2(x1, y1), new Vec2(x1, y2)),
			// bottom
			new Line(new Vec2(x1 + sp, y2 + sp), new Vec2(x2 - sp, y2 + sp)),
			// right
			new Line(new Vec2(x2, y2), new Vec2(x2, y1)),
		];
	}
	
	
	rotatingLines(lines) {
		// apply rotation
		this.rotation = XMath.radianClip(this.rotation + 0.005);
		const {mPos} = RCX;
		let count = 3; // rotating lines count
		let length = 3000; // line initial length
		let angle = XMath.PIx2 / count;
		let line, intersect, xLines = [];
		let r, rr, i, len = lines.length;
		for (r = 0; r < XMath.PIx2; r += angle) {
			
			// slow rotation
			rr = r + this.rotation;
			if (rr > XMath.PIx2) rr -= XMath.PIx2;
			
			// initial line
			line = new Line(mPos, mPos.nextPoint(rr, length));
			
			// check for intersections
			for (i = 0; i < len; i++) {
				// if line intersects, trim
				if (( intersect = Geometry.get_line_intersection(line, lines[i]) )) {
					line = new Line(mPos, intersect);
				}
			}
			xLines.push(line);
		}
		return xLines;
	}
	
	
}
