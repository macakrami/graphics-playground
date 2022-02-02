/*
 * graphics-playground
 * corner-stats.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import BaseView from './base-view';
import RCX from '../model/render-context';
import {Vec2} from '../model/x-geo';
import Configs from '../configs';
import XGraph from '../model/x-graph';

export default class CornerStats extends BaseView {
	
	// TODO: allow add-text event, listen then show.
	
	onDraw() {
		
		const {styler, cW, mouse} = RCX;
		const {drawText, drawPolyline} = XGraph;
		
		// draw corner texts
		let status = RCX.get('status', null);
		if (status) {
			styler.textAlign = 'right';
			status.forEach((text, y) => {
				drawText(text, new Vec2(cW - 8, (y + 1) * 25));
			});
		}
		
		// custom cursor
		if (Configs.hideCursor && Configs.customCursor) {
			styler.method = 'fill';
			drawPolyline([
				mouse.position.add(3, 15),
				mouse.position,
				mouse.position.add(12, 8)
			], true);
			styler.set({method: 'stroke', color: '#54a9e0', lineWidth: 2}).draw();
		}
	}
	
}
