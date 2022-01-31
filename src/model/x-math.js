/*
 * graphics-playground
 * x-math.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

export class XMath {
	
	static num(n, def) {
		return typeof n === 'number' ? n : (def || 0);
	}
	
	static fps(delta) {
		if (delta === 0) delta = 0.01; // avoid division by 0
		return (1000 / delta).toFixed(2);
	}
	
	// stackoverflow_com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
	static get_line_intersection(p0, p1, p2, p3) {
		
		var i_x, i_y;
		var s02_x, s02_y, s10_x, s10_y, s32_x, s32_y, s_numer, t_numer, denom, t, denomPositive;
		s10_x = p1.x - p0.x;
		s10_y = p1.y - p0.y;
		s32_x = p3.x - p2.x;
		s32_y = p3.y - p2.y;
		
		denom = s10_x * s32_y - s32_x * s10_y;
		if (denom === 0)
			return false; // Collinear
		
		denomPositive = denom > 0;
		
		s02_x = p0.x - p2.x;
		s02_y = p0.y - p2.y;
		s_numer = s10_x * s02_y - s10_y * s02_x;
		if ((s_numer < 0) === denomPositive)
			return false; // No collision
		
		t_numer = s32_x * s02_y - s32_y * s02_x;
		if ((t_numer < 0) === denomPositive)
			return false; // No collision
		
		if (((s_numer > denom) === denomPositive) || ((t_numer > denom) === denomPositive))
			return false; // No collision
		
		// Collision detected
		t = t_numer / denom;
		
		i_x = p0.x + (t * s10_x);
		i_y = p0.y + (t * s10_y);
		
		return new Vec2(i_x, i_y);
	}
	
	// stackoverflow_com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
	static point_in_triangle(p, p0, p1, p2) {
		var dX = p.x - p2.x;
		var dY = p.y - p2.y;
		var dX21 = p2.x - p1.x;
		var dY12 = p1.y - p2.y;
		var D = dY12 * (p0.x - p2.x) + dX21 * (p0.y - p2.y);
		var s = dY12 * dX + dX21 * dY;
		var t = (p2.y - p0.y) * dX + (p0.x - p2.x) * dY;
		if (D < 0) return s <= 0 && t <= 0 && s + t >= D;
		return s >= 0 && t >= 0 && s + t <= D;
	}
	
}


export class Vec2 {
	/** @var {number} */
	x;
	/** @var {number} */
	y;
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	/**
	 * @returns {Vec2}
	 */
	invert() {
		return new Vec2(-this.x, -this.y);
	}
	
	/**
	 * @param {number | Vec2} x
	 * @param {number} y
	 * @returns {Vec2}
	 */
	add(x, y) {
		if (x instanceof Vec2) {
			return new Vec2(this.x + x.x, this.y + x.y);
		}
		return new Vec2(this.x + XMath.num(x), this.y + XMath.num(y));
	}
	
	/**
	 * @param {number | Vec2} x
	 * @param {number} y
	 * @returns {Vec2}
	 */
	sub(x, y) {
		if (x instanceof Vec2) {
			return new Vec2(this.x - x.x, this.y - x.y);
		}
		return new Vec2(this.x - x, this.y - y);
	}
	
	/**
	 * @param {number} val
	 * @returns {Vec2}
	 */
	mul(val) {
		val = XMath.num(val);
		return new Vec2(this.x * val, this.y * val);
	}
	
	/**
	 * @param {number} val
	 * @returns {Vec2}
	 */
	div(val) {
		val = XMath.num(val);
		if (val === 0) {
			throw 'division by zero';
		}
		return new Vec2(this.x / val, this.y / val);
	}
	
	
	/**
	 * @param {Vec2} p
	 * @returns {number}
	 */
	distanceTo(p) {
		return Math.sqrt(Math.pow((p.x - this.x), 2) + Math.pow((p.y - this.y), 2));
	}
	
	/**
	 * @param {number} ang
	 * @param {number} distance
	 * @returns {Vec2}
	 */
	nextPoint(ang, distance) {
		let x1 = this.x + (Math.cos(ang) * distance);
		let y1 = this.y + (Math.sin(ang) * distance);
		return new Vec2(x1, y1);
	}
	
	/**
	 * @returns {Vec2}
	 */
	randomPoint() {
		let x1 = Math.floor(Math.random() * this.x);
		let y1 = Math.floor(Math.random() * this.y);
		return new Vec2(x1, y1);
	}
}


export class Frame {
	/** @var {Vec2} */
	point;
	/** @var {Vec2} */
	size;
	
	/**
	 * @param {number | Vec2} x0  point.x or point
	 * @param {number | Vec2} y0  point.y or size
	 * @param {number} w0         width
	 * @param {number} h0         height
	 */
	constructor(x0, y0, w0, h0) {
		if (x0 instanceof Vec2 && y0 instanceof Vec2) {
			this.point = x0;
			this.size = y0;
		} else {
			this.point = new Vec2(x0, y0);
			this.size = new Vec2(w0, h0);
		}
	}
	
	/**
	 * @returns {Vec2}
	 */
	getCenter() {
		return this.point.sub(this.size.div(2));
	}
	
	/**
	 * @param {Vec2} p
	 */
	setCenter(p) {
		this.point = p.sub(this.size.div(2));
	}
	
	/**
	 * @param {number} val
	 * @returns {Frame}
	 */
	inset(val) {
		let val2 = val * 2;
		return new Frame(this.point.x + val, this.point.y + val, this.size.x - val2, this.size.y - val2);
	}
	
	/**
	 * @param {number} val
	 * @returns {Frame}
	 */
	outset(val) {
		let val2 = val * 2;
		return new Frame(this.point.x - val, this.point.y - val, this.size.x + val2, this.size.y + val2);
	}
}


export class Line {
	/** @var {Vec2} */
	p1;
	/** @var {Vec2} */
	p2;
	
	/**
	 * @param {Vec2} p1
	 * @param {Vec2} p2
	 */
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
	
	/**
	 * @param line
	 * @returns {boolean|Vec2}
	 */
	intersectsLine(line) {
		return XMath.get_line_intersection(this.p1, this.p2, line.p1, line.p2);
	}
}


export class Triangle {
	/** @var {Vec2} */
	p1;
	/** @var {Vec2} */
	p2;
	/** @var {Vec2} */
	p3;
	
	/**
	 * @param {Vec2} p1
	 * @param {Vec2} p2
	 * @param {Vec2} p3
	 */
	constructor(p1, p2, p3) {
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}
	
	/**
	 * @param {Vec2} p
	 * @returns {boolean}
	 */
	containsPoint(p) {
		return XMath.point_in_triangle(p, this.p1, this.p2, this.p3);
	}
}

