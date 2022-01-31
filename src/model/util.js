/*
 * graphics-playground
 * util.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */


export default class Util {
	
	static copyFields(source, target) {
		if (typeof source === 'object') {
			for (let k in source) {
				if (source.hasOwnProperty(k)) {
					target[k] = source[k];
				}
			}
		}
	}
	
}
