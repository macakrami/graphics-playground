/*
 * graphics-playground
 * linker.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import Dom from './dom';
import XEngine from './x-engine';

/**
 * Handles connection of DOM to Canvas to graphics engine.
 */
export default class Linker {
	/** @var {HTMLCanvasElement} */
	static canvas;
	/** @var {CanvasRenderingContext2D} */
	static ctx;
	/** @var {boolean} */
	static inFullscreen = false;
	
	/**
	 * Initialize Canvas and 2D Context
	 */
	static init() {
		this.canvas = Dom.createCanvas();
		this.ctx = this.canvas.getContext('2d');
		if (this.ctx === null) {
			throw new Error('Unable to create 2D context.');
		}
	}
	
	/**
	 * Attach to a dom element
	 * @param {HTMLElement} root
	 */
	static attach(root) {
		root.append(this.canvas);
		Dom.register('resize', this.onResize);
		this.onResize();
	}
	
	/**
	 * Detach
	 */
	static detach() {
		this.canvas.parentElement.removeChild(this.canvas);
		Dom.unregister('resize', this.onResize);
	}
	
	/**
	 * Release vars
	 */
	static clear() {
		this.ctx = null;
		this.canvas = null;
	}
	
	/**
	 * window resize event handler
	 * update canvas dimension
	 */
	static onResize() {
		const {canvas} = Linker;
		canvas.width = Dom.getWidth();
		canvas.height = Dom.getHeight();
	}
	
	/**
	 * Enter fullscreen mode
	 * By user permission (browsers enforce this rule)
	 *
	 * @param {function} callback
	 */
	static enterFullscreenMode(callback) {
		this.canvas.requestFullscreen()
			.then(() => {callback(true)})
			.catch(() => {callback(null)});
	}
	
	/**
	 * Exit fullscreen mode
	 *
	 * @param {function} callback
	 */
	static exitFullscreenMode(callback) {
		Dom.exitFullscreen()
			.then(() => {callback(false)})
			.catch(() => {callback(null)});
	}
	
	/**
	 * Toggle fullscreen mode
	 */
	static toggleFullscreen() {
		const handler = (enabled) => {
			if (enabled !== null) {
				this.inFullscreen = enabled;
				XEngine.log((enabled ? 'Entered' : 'Exited') + ' fullscreen.');
			}
		};
		if (this.inFullscreen) {
			this.exitFullscreenMode(handler);
		} else {
			this.enterFullscreenMode(handler);
		}
	}
	
}

