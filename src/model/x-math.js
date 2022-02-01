/*
 * graphics-playground
 * x-math.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


/**
 * Custom Math class
 * Contains some basic math functions related to 2D geometry rendering
 */
export default class XMath {
	
	// PI
	static PI = 3.14159265359;
	// 2PI
	static PIx2 = XMath.PI * 2;
	
	/**
	 * Filter a number
	 * @param n
	 * @param [def]
	 * @returns {number|number}
	 */
	static num(n, def) {
		return typeof n === 'number' ? n : (def || 0);
	}
	
	/**
	 * Calculate FPS from delta
	 *
	 * @param {number} delta
	 * @param {number} [fd]
	 * @returns {string}
	 */
	static fps(delta, fd) {
		if (delta === 0) delta = 0.01; // avoid division by 0
		return (1000 / delta).toFixed(fd || 0);
	}
	
	/**
	 * @param {number} r Radian
	 * @returns {number} Degree
	 */
	static radianToDegree(r) {
		return r * 180 / this.PI;
	}
	
	/**
	 * @param {number} d Degree
	 * @returns {number} Radian
	 */
	static degreeToRadian(d) {
		return d * this.PI / 180;
	}
	
	/**
	 * Makes sure radian stays between 0-Pi2
	 *
	 * @param r
	 * @returns {number}
	 */
	static radianClip(r) {
		while (r < 0) {
			r += this.PIx2;
		}
		return r % this.PIx2;
	}
	
}

