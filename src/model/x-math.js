/*
 * graphics-playground
 * x-math.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

export default class XMath {
	
	static num(n, def) {
		return typeof n === 'number' ? n : (def || 0);
	}
	
	static fps(delta) {
		if (delta === 0) delta = 0.01; // avoid division by 0
		return (1000 / delta).toFixed(2);
	}
	
}

