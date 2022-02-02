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
	
	/** @var {XKeyboard} */
	static keyboard;
	
	/** @var {XMouse} */
	static mouse;
	
	/** @var {HTMLCanvasElement} */
	static canvas;
	
	/** @var {CanvasRenderingContext2D} */
	static ctx;
	
	/** @var {Styler} */
	static styler;
	
	/** @var {number} */
	static cW;
	
	/** @var {number} */
	static cH;
	
	/** @var {Date} */
	static now;
	
	/** @var {number} */
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
