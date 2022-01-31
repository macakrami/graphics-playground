/*
 * graphics-playground
 * geo-fun.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

import Linker from '../model/linker';
import XMouse from '../model/x-mouse';
import {Line, Vec2, Geometry} from '../model/x-geo';
import XGraph from '../model/x-graph';


export default class GeoFun {
	
	static rotation = 0;
	
	static onDraw(now, delta) {
		
		// constants
		const {width: cWidth, height: cHeight} = Linker.canvas;
		const mousePos = XMouse.position;
		
		let i, len;
		let r, rr, r2 = Math.PI * 2;
		
		
		// box lines
		let x1 = cWidth * 0.2;
		let x2 = cWidth * 0.8;
		let y1 = cHeight * 0.2;
		let y2 = cHeight * 0.8;
		let sp = 20;
		let lines = [
			// top
			new Line(new Vec2(x1 + sp, y1 - sp), new Vec2(x2 - sp, y1 - sp)),
			// left
			new Line(new Vec2(x1, y1), new Vec2(x1, y2)),
			// bottom
			new Line(new Vec2(x1 + sp, y2 + sp), new Vec2(x2 - sp, y2 + sp)),
			// right
			new Line(new Vec2(x2, y2), new Vec2(x2, y1)),
		];
		len = lines.length;
		XGraph.styler.color = '#e8e745';
		for (i = 0; i < len; i++) {
			XGraph.drawLine(lines[i]);
		}
		
		// rotation
		this.rotation += 0.005;
		if (this.rotation >= r2) {
			this.rotation = 0;
		}
		
		
		// mouse X
		let count = 3;
		let length = 3000;
		let angle = r2 / count;
		let line, intersect;
		XGraph.styler.color = '#cef2fa';
		for (r = 0; r < r2; r += angle) {
			
			rr = r + this.rotation;
			if (rr > r2) rr -= r2;
			
			line = new Line(mousePos, mousePos.nextPoint(rr, length));
			
			// check for intersections
			for (i = 0; i < len; i++) {
				// if line intersects, trim
				if (( intersect = Geometry.get_line_intersection(line, lines[i]) )) {
					line = new Line(mousePos, intersect);
				}
			}
			XGraph.drawLine(line);
		}
		
		// R
		XGraph.drawText(`R = ${(this.rotation * 100).toFixed(2)}`, new Vec2(cWidth - 8, 125));
		
	}
	
}
