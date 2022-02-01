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
import Util from './util';
import RCX from './render-context';
import EventManager from './event-manager';


/**
 * 2D Engine
 */
export default class XEngine {
	
	static E_INIT = 'x.init';
	static E_DRAW = 'x.draw';
	static E_STOP = 'x.stop';
	static E_EXIT = 'x.exit';
	
	static _running = false;
	
	/**
	 * Initialize engine
	 */
	static init() {
		this.log('Initializing...');
		Linker.init();
		Linker.attach();
		XGraph.init();
		EventManager.trigger(XEngine.E_INIT);
	}
	
	/**
	 * Update common context RCX variables
	 * @see RCX
	 *
	 * @param now
	 * @param delta
	 */
	static updateRCX(now, delta) {
		// constants
		const {canvas, ctx} = Linker;
		// update context
		Util.copyFields({
			now,
			delta,
			canvas,
			ctx,
			styler: XGraph.styler,
			cW: canvas.width,
			cH: canvas.height,
			mPos: XMouse.position,
		}, RCX);
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
		EventManager.trigger(XEngine.E_STOP);
	}
	
	/**
	 * Stops, clears and releases all resources.
	 */
	static clear() {
		this.stop();
		XGraph.clear();
		Linker.detach();
		Linker.clear();
		EventManager.trigger(XEngine.E_EXIT);
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
			XEngine.updateRCX(now, delta);
			EventManager.trigger(XEngine.E_DRAW);
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
