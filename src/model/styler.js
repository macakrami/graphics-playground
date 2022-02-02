/*
 * graphics-playground
 * styler.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import Util from './util';

/**
 * Wrapper class around 2D Context methods
 */
export default class Styler {
	
	/** @type {CanvasRenderingContext2D} */
	ctx;
	
	/** @type {"fill" | "stroke"} */
	method;
	
	/** @type {string | CanvasGradient | CanvasPattern} */
	color;
	
	/** @type {string} */
	font;
	
	/** @type {"center" | "end" | "left" | "right" | "start"} */
	textAlign;
	
	/** @type {number} */
	lineWidth;
	
	/** @type {CanvasLineCap} */
	lineCap; // "butt" || "round" || "square"
	
	/**
	 * @param {object} options
	 */
	constructor(options) {
		Util.copyFields(options, this);
		if (!this.ctx) {
			throw new Error('No ctx');
		}
	}
	
	/**
	 * @param {object} options
	 * @return this
	 */
	set(options) {
		Util.copyFields(options, this);
		return this;
	}
	
	/**
	 * Applies all changes to the 2D Context
	 */
	update() {
		if (this.method === 'fill') this.ctx.fillStyle = this.color;
		if (this.method === 'stroke') this.ctx.strokeStyle = this.color;
		if (this.font) this.ctx.font = this.font;
		if (this.textAlign) this.ctx.textAlign = this.textAlign;
		if (this.lineWidth) this.ctx.lineWidth = this.lineWidth;
		if (this.lineCap) this.ctx.lineCap = this.lineCap;
	}
	
	/**
	 * Draw with previously given instructions, fill or stroke
	 */
	draw() {
		this.update();
		if (this.method === 'fill') {
			this.ctx.fill();
		}
		if (this.method === 'stroke') {
			this.ctx.stroke();
		}
	}
	
	/**
	 *
	 * @param {string} text
	 * @param {number} x
	 * @param {number} y
	 */
	drawText(text, x, y) {
		this.update();
		if (this.method === 'fill') {
			this.ctx.fillText(text, x, y);
		}
		if (this.method === 'stroke') {
			this.ctx.strokeText(text, x, y);
		}
	}
	
}
