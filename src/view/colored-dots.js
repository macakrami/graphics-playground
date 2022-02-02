/*
 * graphics-playground
 * colored-dots.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import ViewAbstract from '../model/view-abstract';
import {Vec2} from '../model/x-geo';
import XMath from '../model/x-math';


export default class ColoredDots extends ViewAbstract {
	
	/** @type {number[]} */
	distances;
	
	rotation = 0;
	
	init() {}
	
	onDraw() {
		
		const {cW, cH} = this.rcx;
		
		this.initDist();
		
		let center = (new Vec2(cW, cH)).div(2);
		
		// apply reverse rotation
		this.rotation = XMath.radianClip(this.rotation - 0.0004);
		
		// get dynamic points position
		let d, r, rr, points = [];
		for (d = 0; d < 360; d++) {
			r = XMath.degreeToRadian(d);
			rr = XMath.radianClip(r + this.rotation);
			points.push(
				center.nextPoint(rr, this.distances[d])
			)
		}
		
		// store in rcx
		this.rcx.set('c-points', points);
		
	}
	
	initDist() {
		if (this.distances) {
			return;
		}
		
		let maxLength = 1000;
		this.distances = [];
		let d, r;
		for (d = 0; d < 360; d++) {
			r = XMath.degreeToRadian(d);
			this.distances.push(
				Math.random() * maxLength
			);
		}
	}
	
	
}
