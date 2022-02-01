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


export default class GeoFun {
	
	static rotation = 0;
	
	static onDraw(now, delta) {
		
		// constants
		const {width: cWidth, height: cHeight} = Linker.canvas;
		const mousePos = XMouse.position;
		
		
		// box lines
		let lines = this.xRectangle(cWidth, cHeight);
		
		// mouse related - rotating lines
		let xLines = this.rotatingLines(mousePos, lines);
		
		// slow rotation
		this.rotation += 0.005;
		if (this.rotation >= XMath.PIx2) {
			this.rotation = 0;
		}
		
		
		XGraph.styler.color = '#e8e745';
		XGraph.drawLines(lines);
		XGraph.styler.color = '#cef2fa';
		XGraph.drawLines(xLines);
		
		//rr = XMath.radianToDegree(this.rotation).toFixed(2);
		//XGraph.variables.cornerText.push(`R = ${rr}`);
		
	}
	
	
	static xRectangle(cWidth, cHeight) {
		let x1 = cWidth * 0.2;
		let x2 = cWidth * 0.8;
		let y1 = cHeight * 0.2;
		let y2 = cHeight * 0.8;
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
	
	
	static rotatingLines(mp, lines) {
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
			line = new Line(mp, mp.nextPoint(rr, length));
			
			// check for intersections
			for (i = 0; i < len; i++) {
				// if line intersects, trim
				if (( intersect = Geometry.get_line_intersection(line, lines[i]) )) {
					line = new Line(mp, intersect);
				}
			}
			xLines.push(line);
		}
		return xLines;
	}
	
	
}
