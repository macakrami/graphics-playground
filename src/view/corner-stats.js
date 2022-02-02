/*
 * graphics-playground
 * corner-stats.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import {Vec2} from '../model/x-geo';
import Configs from '../app/configs';
import XGraph from '../model/x-graph';
import ViewAbstract from '../model/view-abstract';

/**
 * Renders the status text on the top right corner
 */
export default class CornerStats extends ViewAbstract {
	
	init() {}
	
	onDraw() {
		
		const {styler, cW, mouse: {position}} = this.rcx;
		const {drawText, drawPolyline, drawCircle} = XGraph;
		
		// draw corner texts
		let status = this.rcx.get('status', null);
		if (status) {
			styler.set({color: '#c0ffd2', textAlign: 'right'});
			status.forEach((text, y) => {
				drawText(text, new Vec2(cW - 8, (y + 1) * 25));
			});
		}
		
		// custom cursor
		if (Configs.hideCursor && Configs.customCursor) {
			// styler.set({method: 'fill', color: '#9a9a9a'});
			// drawPolyline(
			// 	[position.add(3, 15), position, position.add(12, 8)],
			// 	true
			// );
			// styler.set({method: 'stroke', color: '#54a9e0', lineWidth: 2});
			// styler.draw();
			
			styler.set({method: 'fill', color: '#000'});
			drawCircle(position, 20);
			styler.set({method: 'stroke', color: '#222', lineWidth: 1});
			drawCircle(position, 20);
			styler.color = '#555';
			styler.drawDot(position.x, position.y, 2);
		}
	}
	
}
