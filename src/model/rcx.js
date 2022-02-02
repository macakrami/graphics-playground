/*
 * graphics-playground
 * rcx.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


/**
 * 2D Context with all common objects
 */
export default class RCX {
	
	/** @type {XKeyboard} */
	keyboard;
	
	/** @type {XMouse} */
	mouse;
	
	/** @type {HTMLCanvasElement} */
	canvas;
	
	/** @type {CanvasRenderingContext2D} */
	ctx;
	
	/** @type {Styler} */
	styler;
	
	/** @type {number} */
	cW;
	
	/** @type {number} */
	cH;
	
	/** @type {Date} */
	now;
	
	/** @type {number} */
	delta;
	
	
	// vars getter + setter
	_vars = {};
	set(k, v) {
		this._vars[k] = v;
	}
	get(k, def) {
		return typeof this._vars[k] !== 'undefined' ? this._vars[k] : def;
	}
	
}
