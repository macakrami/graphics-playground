/*
 * graphics-playground
 * render-context.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


/**
 * 2D Context with all common objects
 */
export default class RCX {
	
	/** @type {XKeyboard} */
	static keyboard;
	
	/** @type {XMouse} */
	static mouse;
	
	/** @type {HTMLCanvasElement} */
	static canvas;
	
	/** @type {CanvasRenderingContext2D} */
	static ctx;
	
	/** @type {Styler} */
	static styler;
	
	/** @type {number} */
	static cW;
	
	/** @type {number} */
	static cH;
	
	/** @type {Date} */
	static now;
	
	/** @type {number} */
	static delta;
	
	
	// vars getter + setter
	static _vars = {};
	static set(k, v) {
		this._vars[k] = v;
	}
	static get(k, def) {
		return typeof this._vars[k] !== 'undefined' ? this._vars[k] : def;
	}
	
}
