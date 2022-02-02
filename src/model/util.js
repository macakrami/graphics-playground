/*
 * graphics-playground
 * util.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


export default class Util {
	
	/**
	 * @param {object} source
	 * @param {object} target
	 */
	static copyFields(source, target) {
		if (typeof source === 'object') {
			for (let k in source) {
				if (source.hasOwnProperty(k)) {
					target[k] = source[k];
				}
			}
		}
	}
	
	/**
	 * @param {array} arr
	 * @param {array} items
	 * @return {array}
	 */
	static arrayAppend(arr, items) {
		items.forEach((item) => arr.push(item));
		return items;
	}
	
	/**
	 *
	 * @param {HTMLElement} element
	 * @param {string | HTMLElement | HTMLElement[]} content
	 */
	static elementSetContent(element, content) {
		if (typeof content === 'undefined') {
			return;
		}
		if (typeof content === 'string') {
			element.innerHTML = content;
			return;
		}
		if (typeof content === 'object' && content !== null) {
			if (Array.isArray(content)) {
				content.forEach((item) => {
					Util.elementSetContent(element, item);
				});
			} else {
				element.append(content);
			}
		}
	}
	
}
