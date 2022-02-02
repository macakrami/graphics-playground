/*
 * graphics-playground
 * rotating-triangle.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import ViewAbstract from '../model/view-abstract';
import XMath from '../model/x-math';
import {Geometry, Line, Vec2} from '../model/x-geo';


export default class RotatingTriangle extends ViewAbstract {
	
	lineLength = 5000;
	lineTotal = 3;
	
	/** @var {number} */
	rotation;
	
	/** @var {Vec2} */
	lastPosition;
	
	init() {
		this.rotation = 0;
		this.lastPosition = new Vec2();
	}
	
	onDraw() {
		
		const {mouse: {position}} = this.rcx;
		
		this.lastPosition.x += (position.x - this.lastPosition.x) * 0.02;
		this.lastPosition.y += (position.y - this.lastPosition.y) * 0.02;
		
		
		// rect lines data. to check for collision
		/** @var {Line[]} */
		let rectLines = this.rcx.get('rect-lines');
		/** @var {Line[]} */
		let rectangle = this.rcx.get('rectangle');
		
		// apply rotation
		this.rotation = XMath.radianClip(this.rotation + 0.005);
		
		// build triangle from mouse position
		let center = this.lastPosition;
		let angle = XMath.PIx2 / this.lineTotal;
		let line1, line, intersect, xLines = [], xLines2 = [];
		let r, rr, i, len = rectLines.length, len2 = rectangle.length;
		for (r = 0; r < XMath.PIx2; r += angle) {
			
			// slow rotation
			rr = r + this.rotation;
			if (rr > XMath.PIx2) rr -= XMath.PIx2;
			
			// initial line
			line1 = new Line(center, center.nextPoint(rr, this.lineLength));
			
			// check for intersections
			line = null;
			// for (i = 0; i < len; i++) {
			//
			// 	// if line intersects, trim
			// 	intersect = Geometry.get_line_intersection(line1, rectLines[i]);
			// 	if (intersect) {
			// 		line = new Line(position, intersect);
			// 	}
			// }
			
			//xLines.push(line || line1);
			xLines.push(line1);
			
			
			// rectangle intersections
			line = null;
			for (i = 0; i < len2; i++) {
				
				// if line intersects, trim
				intersect = Geometry.get_line_intersection(line1, rectangle[i]);
				if (intersect) {
					line = new Line(center, intersect);
				}
			}
			xLines2.push(line || line1);
			
		}
		
		// store in rcx
		this.rcx.set('x-lines', xLines);
		
		this.rcx.set('x-lines-2', xLines2);
		
		//this.rcx.get('status').push(`p: ${this.lastPosition.x.toFixed()} ${this.lastPosition.y.toFixed()}`);
		
	}
	
}
