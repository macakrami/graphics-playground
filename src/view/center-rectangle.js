/*
 * graphics-playground
 * center-rectangle.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import ViewAbstract from '../model/view-abstract';
import {Line, Vec2} from '../model/x-geo';

export default class CenterRectangle extends ViewAbstract {
	
	init() {}
	
	onDraw() {
		
		const {cW, cH} = this.rcx;
		
		let x1 = cW * 0.1;
		let x2 = cW * 0.9;
		let y1 = cH * 0.1;
		let y2 = cH * 0.9;
		
		let xLen = cW * 0.05;
		let yLen = cH * 0.1;
		
		let rectLines = [
			
			// top left
			new Line(new Vec2(x1, y1), new Vec2(x1 + xLen, y1)),
			new Line(new Vec2(x1, y1), new Vec2(x1, y1 + yLen)),
			
			// top right
			new Line(new Vec2(x2, y1), new Vec2(x2 - xLen, y1)),
			new Line(new Vec2(x2, y1), new Vec2(x2, y1 + yLen)),
			
			// bottom left
			new Line(new Vec2(x1, y2), new Vec2(x1 + xLen, y2)),
			new Line(new Vec2(x1, y2), new Vec2(x1, y2 - yLen)),
			
			// bottom right
			new Line(new Vec2(x2, y2), new Vec2(x2 - xLen, y2)),
			new Line(new Vec2(x2, y2), new Vec2(x2, y2 - yLen)),
		];
		
		let rectangle = [
			// top
			new Line(new Vec2(x1, y1), new Vec2(x2, y1)),
			// right
			new Line(new Vec2(x2, y1), new Vec2(x2, y2)),
			// bottom
			new Line(new Vec2(x2, y2), new Vec2(x1, y2)),
			// left
			new Line(new Vec2(x1, y2), new Vec2(x1, y1)),
		];
		
		
		// store in rcx
		this.rcx.set('rect-lines', rectLines);
		
		this.rcx.set('rectangle', rectangle);
		
	}
	
}
