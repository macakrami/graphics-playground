/*
 * graphics-playground
 * dom.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */


/**
 * Keeping everything related to 'window' or 'document'
 * object, in one area.
 */
export default class Dom {
	
	/**
	 * @returns {HTMLElement}
	 */
	static getRoot() {
		return document.getElementById('root');
	}
	
	/**
	 * @returns {HTMLCanvasElement}
	 */
	static createCanvas() {
		return document.createElement('canvas');
	}
	
	/**
	 * Show or Hide cursor
	 *
	 * @param {boolean} show
	 */
	static setCursor(show) {
		if (typeof show === 'undefined') {
			show = true;
		}
		document.body.style.cursor = show ? '' : 'none';
	}
	
	/**
	 * Body width
	 *
	 * @returns {number}
	 */
	static getWidth() {
		return document.body.clientWidth;
	}
	
	/**
	 * Body height
	 *
	 * @returns {number}
	 */
	static getHeight() {
		return document.body.clientHeight;
	}
	
	/**
	 * Register for global events
	 *
	 * @param {string} type
	 * @param {function} listener
	 */
	static register(type, listener) {
		// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
		window.addEventListener(type, listener, false);
	}
	
	/**
	 * Unregister for global events
	 *
	 * @param {string} type
	 * @param {function} listener
	 */
	static unregister(type, listener) {
		window.removeEventListener(type, listener);
	}
	
	/**
	 * Request animation frame
	 *
	 * @param {function} callback
	 */
	static nextFrame(callback) {
		window.requestAnimationFrame(callback);
	}
	
	/**
	 * @returns {Promise}
	 */
	static exitFullscreen() {
		return document.exitFullscreen();
	}
	
}
