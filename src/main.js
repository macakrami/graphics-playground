/*
 * graphics-playground
 * main.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import './styles.scss';
import XEngine from './model/x-engine';
import XGraph from './model/x-graph';
import XMath from './model/x-math';
import XMouse from './model/x-mouse';
import XKeyboard from './model/x-keyboard';
import Configs from './configs';
import Linker from './model/linker';
import Dom from './model/dom';
import GeoFun from './view/geo-fun';
import {Vec2} from './model/x-geo';



class Main {
	
	/**
	 * Draw handler
	 *
	 * @param now
	 * @param delta
	 */
	static onDraw(now, delta) {
		
		// Esc to exit
		if (XKeyboard.isDown(XKeyboard.KEY.DOM_VK_ESCAPE)) {
			XEngine.clear();
			return;
		}
		
		// F to Fullscreen
		if (XKeyboard.isPressed(XKeyboard.KEY.DOM_VK_F)) {
			Linker.toggleFullscreen();
		}
		
		// constants
		const {canvas, ctx} = Linker;
		const {width: cWidth, height: cHeight} = canvas;
		const mousePos = XMouse.position;
		let i, len;
		
		// clear
		XGraph.clearRect();
		
		// prepare styler
		XGraph.styler.font = Configs.font;
		XGraph.styler.method = 'stroke';
		XGraph.styler.color = '#ffffff';
		XGraph.styler.lineWidth = 1;
		XGraph.styler.textAlign = 'left';
		
		// corner text prep
		XGraph.variables.cornerText = [];
		
		let FPS = XMath.fps(delta);
		let FS = Linker.inFullscreen ? 'ON' : 'OFF';
		XGraph.variables.cornerText.push(`FPS: ${FPS}`);
		XGraph.variables.cornerText.push(`Esc = exit`);
		XGraph.variables.cornerText.push(`F = Toggle Fullscreen (${FS})`);
		XGraph.variables.cornerText.push(`(${mousePos.x}, ${mousePos.y})`);
		
		// main draw
		Main.mainDrawII(now, delta);
		
		// draw corner texts
		XGraph.styler.textAlign = 'right';
		len = XGraph.variables.cornerText.length;
		for (i = 0; i < len; i++) {
			XGraph.drawText(XGraph.variables.cornerText[i], new Vec2(cWidth- 8, (i + 1) * 25));
		}
		
		// custom cursor
		if (Configs.hideCursor && Configs.customCursor) {
			XGraph.styler.method = 'fill';
			XGraph.drawPolyline([mousePos.add(3, 15), mousePos, mousePos.add(12, 8)], true);
			XGraph.styler.method = 'stroke';
			XGraph.styler.color = '#54a9e0';
			XGraph.styler.lineWidth = 2;
			XGraph.styler.draw();
		}
	}
	
	/**
	 * Main draw
	 * reserved for rendering the good stuff
	 *
	 * @param now
	 * @param delta
	 */
	static mainDrawII(now, delta) {
		GeoFun.onDraw.apply(GeoFun, [now, delta]);
	}
	
	
	/**
	 * Engine initialized handler
	 * Apply configurations
	 */
	static onInit() {
		Dom.setCursor(!Configs.hideCursor);
		XEngine.log('Main Initialized');
	}
	
	/**
	 * Engine stopped handler
	 */
	static onStop() {
		XEngine.log('Stopped');
		Dom.setCursor(Configs.hideCursor);
	}
	
	/**
	 * Engine cleared out all resources handler
	 */
	static onExit() {
		XEngine.log('Exited');
		let restart = () => {
			Dom.clearMessage();
			Main.start();
		};
		let btn = Dom.create('button', {onclick: restart, 'class': 'action'}, 'Restart');
		let msg = Dom.create('div', {}, 'Exited.<br>\nReleased all reserved resources.<br>');
		msg.append(btn);
		Dom.showMessage(msg);
	}
	
	/**
	 * Main start
	 */
	static start() {
		XEngine.init(this.onInit, this.onDraw, this.onStop, this.onExit, Dom.getRoot());
		XEngine.start();
	}
}

// RUN
Main.start();
