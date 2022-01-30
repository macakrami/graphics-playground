
import {Vec2} from './x-math';

export default class XMouse {
	static left;
	static middle;
	static right;
	static position;
	
	static enable() {
		this.reset();
		window.addEventListener('mousedown', XMouse._updateButtons, false);
		window.addEventListener('mouseup', XMouse._updateButtons, false);
		window.addEventListener('mousemove', XMouse._updateButtons, false);
		window.addEventListener('contextmenu', XMouse._menu, false);
	}
	
	static disable() {
		window.removeEventListener('mousedown', XMouse._updateButtons);
		window.removeEventListener('mouseup', XMouse._updateButtons);
		window.removeEventListener('mousemove', XMouse._updateButtons);
		window.removeEventListener('contextmenu', XMouse._menu);
		this.reset();
	}
	
	static reset() {
		this.left = false;
		this.middle = false;
		this.right = false;
		this.position = new Vec2();
	}
	
	
	static _updateButtons(e) {
		e.preventDefault();
		const button = {};
		if (e.type === 'mousedown') {
			button[e.which] = true;
		}
		if (e.type === 'mouseup') {
			button[e.which] = false;
		}
		XMouse.left = !!button[1];
		XMouse.middle = !!button[2];
		XMouse.right = !!button[3];
		XMouse.position = new Vec2(e.offsetX, e.offsetY);
	}
	
	static _menu(e) {
		e.preventDefault();
	}
	
}
