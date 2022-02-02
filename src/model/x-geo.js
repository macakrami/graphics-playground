/*
 * graphics-playground
 * x-geo.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import XMath from './x-math';


/**
 * Vector 2D class
 */
export class Vec2 {
	/** @type {number} */
	x;
	/** @type {number} */
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
	 * @param {number} [y]
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
	 * @param {number} [y]
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


/**
 * 2D Line class
 */
export class Line {
	/** @type {Vec2} */
	p1;
	/** @type {Vec2} */
	p2;
	
	/**
	 * @param {Vec2} p1
	 * @param {Vec2} p2
	 */
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
}


/**
 * Polygon class
 */
export class Polygon {
	/** @type {Vec2[]} */
	ps;
	
	/**
	 * @param {Vec2[]} ps
	 */
	constructor(ps) {
		this.ps = ps || [];
	}
}


/**
 * Triangle class
 */
export class Triangle {
	/** @type {Vec2} */
	p1;
	/** @type {Vec2} */
	p2;
	/** @type {Vec2} */
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
}


/**
 * 2D Frame class
 * point: top-left corner position
 * size: width, height
 */
export class Frame {
	/** @type {Vec2} */
	point;
	/** @type {Vec2} */
	size;
	
	/**
	 * @param {number | Vec2} x0  point.x or point
	 * @param {number | Vec2} y0  point.y or size
	 * @param {number} [w0]       width
	 * @param {number} [h0]       height
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


/**
 * Geometry special functions
 */
export class Geometry {
	
	/**
	 * Line segment intersect detection
	 * @see https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
	 *
	 * @param {Line} l1
	 * @param {Line} l2
	 * @returns {boolean | Vec2}
	 */
	static get_line_intersection(l1, l2) {
		
		let i_x, i_y;
		let s02_x, s02_y, s10_x, s10_y, s32_x, s32_y, s_numer, t_numer, denom, t, denomPositive;
		s10_x = l1.p2.x - l1.p1.x;
		s10_y = l1.p2.y - l1.p1.y;
		s32_x = l2.p2.x - l2.p1.x;
		s32_y = l2.p2.y - l2.p1.y;
		
		denom = s10_x * s32_y - s32_x * s10_y;
		if (denom === 0)
			return false; // Collinear
		
		denomPositive = denom > 0;
		
		s02_x = l1.p1.x - l2.p1.x;
		s02_y = l1.p1.y - l2.p1.y;
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
		
		i_x = l1.p1.x + (t * s10_x);
		i_y = l1.p1.y + (t * s10_y);
		
		return new Vec2(i_x, i_y);
	}
	
	
	/**
	 * Point in triangle detection
	 * @see https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
	 *
	 * @param {Vec2} p
	 * @param {Triangle} tri
	 * @returns {boolean}
	 */
	static point_in_triangle(p, tri) {
		let dX = p.x - tri.p3.x;
		let dY = p.y - tri.p3.y;
		let dX21 = tri.p3.x - tri.p2.x;
		let dY12 = tri.p2.y - tri.p3.y;
		let D = dY12 * (tri.p1.x - tri.p3.x) + dX21 * (tri.p1.y - tri.p3.y);
		let s = dY12 * dX + dX21 * dY;
		let t = (tri.p3.y - tri.p1.y) * dX + (tri.p1.x - tri.p3.x) * dY;
		if (D < 0) return s <= 0 && t <= 0 && s + t >= D;
		return s >= 0 && t >= 0 && s + t <= D;
	}
	
	
	/**
	 * PNPOLY
	 * @see https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
	 * @see https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
	 *
	 * @param {Vec2} p
	 * @param {Polygon} poly
	 * @returns {boolean}
	 */
	static point_in_polygon(p, poly) {
		let i, j, len, inside = false;
		const {ps} = poly;
		len = ps.length;
		for (i = 0, j = len - 1; i < len; j = i++) {
			if (ps[i].y > p.y !== ps[j].y > p.y &&
				p.x < (ps[j].x - ps[i].x) * (p.y - ps[i].y) / (ps[j].y - ps[i].y) + ps[i].x) {
				inside = !inside;
			}
		}
		return inside;
	}
	
}

