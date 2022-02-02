/*
 * graphics-playground
 * main-view.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import XGraph from '../model/x-graph';
import XKeyboard from '../model/x-keyboard';
import XEngine from '../model/x-engine';
import Linker from '../model/linker';
import Configs from '../app/configs';
import XMath from '../model/x-math';
import ViewAbstract from '../model/view-abstract';


/**
 * Main View
 * handles 'key' inputs: exit, fullscreen
 * prepares view: clear screen, reset styler
 * prepares status/info text
 */
export default class MainView extends ViewAbstract {
	
	init() {}
	
	onDraw() {
		
		const {delta, styler, keyboard, mouse} = this.rcx;
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
			color: '#fff',
			lineWidth: 1,
			textAlign: 'left',
		});
		
		// corner text prep
		this.rcx.set('status', [
			`Esc to exit, F to Fullscreen, FPS: ${XMath.fps(delta)}`,
			//`Esc = exit`,
			//`F = Toggle Fullscreen (${Linker.inFullscreen ? 'ON' : 'OFF'})`,
			//`(${mouse.position.x}, ${mouse.position.y})`
		]);
		
	}
	
}
