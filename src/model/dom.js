/*
 * graphics-playground
 * dom.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import Util from './util';

/**
 * Keeping everything related to 'window' or 'document'
 * object, in one area.
 */
export default class Dom {
	
	/**
	 * @param {string} id
	 * @returns {HTMLElement}
	 */
	static get(id) {
		return document.getElementById(id);
	}
	
	/**
	 * @returns {HTMLElement}
	 */
	static getRoot() {
		return this.get('root');
	}
	
	/**
	 * @param {string} type
	 * @param {object} [props]
	 * @param {string|HTMLElement} [content]
	 * @returns {HTMLElement}
	 */
	static create(type, props, content) {
		let element = document.createElement(type);
		if (props && props['class']) {
			let cls = props['class'];
			delete props['class'];
			element.classList.add(cls);
		}
		Util.copyFields(props, element);
		if (typeof content === 'string') {
			element.innerHTML = content;
		} else if (typeof content === 'object' && content !== null) {
			element.append(content);
		}
		return element;
	}
	
	/**
	 * @returns {HTMLCanvasElement}
	 */
	static createCanvas() {
		return this.create('canvas');
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
	
	/**
	 * @param {HTMLElement} node
	 */
	static showMessage(node) {
		Dom.getRoot().append(
			Dom.create('div', {'class': 'message'}, node)
		);
	}
	
	/**
	 * Remove the shown message
	 */
	static clearMessage() {
		let elements = Dom.getRoot().getElementsByClassName('message');
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
	
}
