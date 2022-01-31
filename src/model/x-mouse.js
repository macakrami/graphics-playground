/*
 * graphics-playground
 * x-mouse.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

import {Vec2} from './x-geo';
import Dom from './dom';

export default class XMouse {
	
	/** @var {boolean} */
	static left;
	
	/** @var {boolean} */
	static middle;
	
	/** @var {boolean} */
	static right;
	
	/** @var {Vec2} */
	static position;
	
	/**
	 * Enable updating mouse input vars
	 */
	static enable() {
		this.reset();
		Dom.register('mousedown', XMouse._updateButtons);
		Dom.register('mouseup', XMouse._updateButtons);
		Dom.register('mousemove', XMouse._updateButtons);
		Dom.register('contextmenu', XMouse._menu);
	}
	
	/**
	 * Disable updating
	 */
	static disable() {
		Dom.unregister('mousedown', XMouse._updateButtons);
		Dom.unregister('mouseup', XMouse._updateButtons);
		Dom.unregister('mousemove', XMouse._updateButtons);
		Dom.unregister('contextmenu', XMouse._menu);
		this.reset();
	}
	
	/**
	 * Initialize vars
	 */
	static reset() {
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
	static _updateButtons(event) {
		event.preventDefault();
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
		XMouse.left = !!btn[1];
		XMouse.middle = !!btn[2];
		XMouse.right = !!btn[3];
		XMouse.position = new Vec2(offsetX, offsetY);
	}
	
	/**
	 * Context Menu handler
	 * Blocks right click menu
	 *
	 * @param e
	 * @private
	 */
	static _menu(e) {
		e.preventDefault();
	}
}