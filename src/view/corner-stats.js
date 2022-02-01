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
		
		const {now, delta, canvas, ctx, styler, cW, cH, mPos} = RCX;
		const {clearRect, drawText, drawPolyline} = XGraph;
		
		// draw corner texts
		if (RCX.cornerText) {
			styler.textAlign = 'right';
			RCX.cornerText.forEach((text, y) => {
				drawText(text, new Vec2(cW - 8, (y + 1) * 25));
			});
		}
		
		// custom cursor
		if (Configs.hideCursor && Configs.customCursor) {
			styler.method = 'fill';
			drawPolyline([mPos.add(3, 15), mPos, mPos.add(12, 8)], true);
			styler.set({method: 'stroke', color: '#54a9e0', lineWidth: 2}).draw();
		}
	}
	
}
