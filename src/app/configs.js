/*
 * graphics-playground
 * configs.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

/*
 * graphics-playground
 * configs.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


/**
 * Configs class
 */
export default class Configs {
	
	/**
	 * To show debug logs
	 * @type {boolean}
	 */
	static DEBUG			= true;
	
	/**
	 * To hide system cursor
	 *
	 * @type {boolean}
	 */
	static hideCursor		= true;
	
	/**
	 * To show custom rendered cursor
	 * (only if 'hideCursor' is true
	 * @type {boolean}
	 */
	static customCursor		= true;
	
	/**
	 * Font setting for 2D context
	 * @type {string}
	 */
	static font				= '18px Courier New';
	
}
