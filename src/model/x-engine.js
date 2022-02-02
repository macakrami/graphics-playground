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
	
	/**
	 * Whether the engine is running or not
	 *
	 * @type {boolean}
	 * @private
	 */
	static _running = false;
	
	/**
	 * Frames drawn count
	 *
	 * @type {number}
	 * @private
	 */
	static _frames;
	
	/** @type {XMouse} */
	static mouse;
	/** @type {XKeyboard} */
	static keyboard;
	
	/**
	 * Initialize engine
	 */
	static init() {
		this.log('Initializing...');
		Linker.init();
		Linker.attach();
		XGraph.init();
		this.keyboard = new XKeyboard();
		this.mouse = new XMouse();
		EventManager.trigger(this.E_INIT);
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
			keyboard: this.keyboard,
			mouse: this.mouse,
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
		this._frames = 0;
		this.keyboard.enable();
		this.mouse.enable();
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
		this.mouse.disable();
		this.keyboard.disable();
		EventManager.trigger(this.E_STOP);
		console.log(`Stopped. rendered ${this._frames} frames.`);
	}
	
	/**
	 * Stops, clears and releases all resources.
	 */
	static clear() {
		this.stop();
		XGraph.clear();
		Linker.detach();
		Linker.clear();
		EventManager.trigger(this.E_EXIT);
	}
	
	/**
	 * Draw loop
	 */
	static startLoop() {
		let now, delta, lastDraw = new Date();
		const loop = () => {
			if (!this._running) {
				return;
			}
			this._frames++;
			now = new Date();
			delta = (now - lastDraw);
			lastDraw = now;
			this.updateRCX(now, delta);
			EventManager.trigger(this.E_DRAW);
			this.keyboard.updateLastDown();
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
