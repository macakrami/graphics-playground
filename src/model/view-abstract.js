/*
 * graphics-playground
 * view-abstract.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


/**
 * View abstract class.
 */
export default class ViewAbstract {
	
	/** @type {RCX} */
	rcx;
	
	/** @type {number} */
	renderIndex;
	
	/**
	 * Init event
	 */
	init() {}
	
	/**
	 * Draw event. to be overridden
	 */
	onDraw() {}
	
}