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
	
	/** @var {Vec2} */
	static mPos;
	
	/** @var {Date} */
	static now;
	/** @var {number} */
	static delta;
	
}
