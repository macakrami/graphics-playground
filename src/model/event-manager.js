/*
 * graphics-playground
 * event-manager.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


export default class EventManager {
	
	static _listeners = [];
	
	static reset() {
		this._listeners = [];
	}
	
	static listen(target, name, callback) {
		if (typeof this._listeners[name] === 'undefined') {
			this._listeners[name] = [];
		}
		this._listeners[name].push({target, callback});
	}
	
	static trigger(name, data) {
		if (typeof this._listeners[name] !== 'undefined') {
			this._listeners[name].forEach((item) => {
				item.callback.apply(item.target, [data]);
			});
		}
	}
	
}

