/*
 * graphics-playground
 * styler.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

import Util from './util';

/**
 * Wrapper class around 2D Context methods
 */
export default class Styler {
	
	/** @var {CanvasRenderingContext2D} */
	ctx;
	/** @var {"fill" | "stroke"} */
	method;
	/** @var {string | CanvasGradient | CanvasPattern} */
	color;
	/** @var {string} */
	font;
	/** @var {"center" | "end" | "left" | "right" | "start"} */
	textAlign;
	/** @var {number} */
	lineWidth;
	
	constructor(options) {
		Util.copyFields(options, this);
		if (!this.ctx) {
			throw new Error('No ctx');
		}
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
		//.lineCap = "butt" || "round" || "square";
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
