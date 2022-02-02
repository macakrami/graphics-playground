/*
 * graphics-playground
 * x-mouse.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import {Vec2} from './x-geo';
import Dom from './dom';

export default class XMouse {
	
	/** @var {boolean} */
	left;
	
	/** @var {boolean} */
	middle;
	
	/** @var {boolean} */
	right;
	
	/** @var {Vec2} */
	position;
	
	/**
	 * Hook 'this' to _update method
	 */
	constructor() {
		this._update = this._update.bind(this);
	}
	
	/**
	 * Enable updating mouse input vars
	 */
	enable() {
		this.reset();
		Dom.register('mousedown', this._update);
		Dom.register('mouseup', this._update);
		Dom.register('mousemove', this._update);
		Dom.register('contextmenu', this._update);
	}
	
	/**
	 * Disable updating
	 */
	disable() {
		Dom.unregister('mousedown', this._update);
		Dom.unregister('mouseup', this._update);
		Dom.unregister('mousemove', this._update);
		Dom.unregister('contextmenu', this._update);
		this.reset();
	}
	
	/**
	 * Initialize vars
	 */
	reset() {
		this.left = false;
		this.middle = false;
		this.right = false;
		this.position = new Vec2();
	}
	
	/**
	 * MouseEvent handler
	 *
	 * https://developer.mozilla.org/en-US/docs/web/api/mouseevent/button
	 * https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/which
	 *
	 * @param {MouseEvent} event
	 * @private
	 */
	_update(event) {
		event.preventDefault();
		if (event.type === 'contextmenu') {
			return;
		}
		const {type, button, which, offsetX, offsetY} = event;
		const btn = {};
		let index;
		if (typeof button !== 'undefined') {
			index = button + 1;
		} else if (typeof which !== 'undefined') {
			index = which;
		} else {
			throw new Error('Invalid mouse event');
		}
		if (type === 'mousedown') {
			btn[index] = true;
		}
		if (type === 'mouseup') {
			btn[index] = false;
		}
		this.left = !!btn[1];
		this.middle = !!btn[2];
		this.right = !!btn[3];
		this.position = new Vec2(offsetX, offsetY);
	}
	
}