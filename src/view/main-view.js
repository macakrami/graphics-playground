/*
 * graphics-playground
 * main-view.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import RCX from '../model/render-context';
import XGraph from '../model/x-graph';
import XKeyboard from '../model/x-keyboard';
import XEngine from '../model/x-engine';
import Linker from '../model/linker';
import Configs from '../configs';
import XMath from '../model/x-math';
import BaseView from './base-view';

/**
 * Main View
 */
export default class MainView extends BaseView {
	
	
	onDraw() {
		
		const {delta, styler, keyboard, mouse} = RCX;
		const {clearRect} = XGraph;
		const {KEY: {DOM_VK_ESCAPE, DOM_VK_F}} = XKeyboard;
		
		// Esc to exit
		if (keyboard.isDown(DOM_VK_ESCAPE)) {
			XEngine.clear();
			return;
		}
		
		// F to Fullscreen
		if (keyboard.isPressed(DOM_VK_F)) {
			Linker.toggleFullscreen();
		}
		
		// clear
		clearRect();
		
		// prepare styler
		styler.set({
			font: Configs.font,
			method: 'stroke',
			color: '#ffffff',
			lineWidth: 1,
			textAlign: 'left',
		});
		
		// corner text prep
		RCX.set('status', [
			`FPS: ${XMath.fps(delta)}`,
			`Esc = exit`,
			`F = Toggle Fullscreen (${Linker.inFullscreen ? 'ON' : 'OFF'})`,
			`(${mouse.position.x}, ${mouse.position.y})`
		]);
		
	}
	
}
