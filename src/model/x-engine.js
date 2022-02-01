/*
 * graphics-playground
 * x-engine.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import Linker from './linker';
import XMouse from './x-mouse';
import XGraph from './x-graph';
import XKeyboard from './x-keyboard';
import Dom from './dom';

/**
 * 2D Engine
 */
export default class XEngine {
	static _onDraw;
	static _onStop;
	static _onExit;
	static _running = false;
	
	/**
	 * Initialize engine
	 *
	 * @param {function} onInit
	 * @param {function} onDraw
	 * @param {function} onStop
	 * @param {function} onExit
	 * @param {HTMLElement} root
	 */
	static init(onInit, onDraw, onStop, onExit, root) {
		this.log('Initializing...');
		this._onDraw = onDraw;
		this._onStop = onStop;
		this._onExit = onExit;
		Linker.init();
		Linker.attach(root);
		XGraph.init();
		onInit();
	}
	
	/**
	 * Start engine
	 */
	static start() {
		if (this._running) {
			return;
		}
		this._running = true;
		XKeyboard.enable();
		XMouse.enable();
		this.startLoop();
		this.log('Started');
	}
	
	/**
	 * Stop engine
	 */
	static stop() {
		if (!this._running) {
			return;
		}
		this._running = false;
		this.log('Stopping...');
		XMouse.disable();
		XKeyboard.disable();
		this._onStop();
	}
	
	/**
	 * Stops, clears and releases all resources.
	 */
	static clear() {
		this.stop();
		XGraph.clear();
		Linker.detach();
		Linker.clear();
		this._onExit();
		this._onDraw = null;
		this._onStop = null;
		this._onExit = null;
	}
	
	/**
	 * Draw loop
	 */
	static startLoop() {
		let now, delta, lastDraw = new Date();
		const loop = () => {
			if (!XEngine._running) {
				return;
			}
			now = new Date();
			delta = (now - lastDraw);
			lastDraw = now;
			XEngine._onDraw(now, delta);
			XKeyboard.updateLastDown();
			Dom.nextFrame(loop);
		};
		Dom.nextFrame(loop);
	}
	
	
	/**
	 * Custom log function
	 */
	static log() {
		let args = Array.prototype.slice.call(arguments);
		args.unshift('XEngine:');
		console.log.apply(this, args);
	}
	
}
