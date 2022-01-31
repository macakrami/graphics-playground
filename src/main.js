/*
 * graphics-playground
 * main.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
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
	 * Engine initialized handler
	 * Apply configurations
	 */
	static onInit() {
		Dom.setCursor(!Configs.hideCursor);
		XEngine.log('Main Initialized');
	}
	
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
		
		// clear
		XGraph.clearRect();
		
		// prepare styler
		XGraph.styler.font = Configs.font;
		XGraph.styler.method = 'stroke';
		XGraph.styler.color = '#ffffff';
		XGraph.styler.lineWidth = 1;
		XGraph.styler.textAlign = 'left';
		
		// main draw
		Main.mainDrawII(now, delta);
		
		// FPS
		XGraph.styler.textAlign = 'right';
		XGraph.drawText('FPS: ' + XMath.fps(delta), new Vec2(cWidth - 8, 25));
		
		// info
		XGraph.drawText(`Esc = exit`, new Vec2(cWidth - 8, 75));
		let fs = Linker.inFullscreen ? '1' : '0';
		XGraph.drawText(`F = Toggle Fullscreen (${fs})`, new Vec2(cWidth - 8, 100));
		
		// CURSOR
		XGraph.drawText(`(${mousePos.x}, ${mousePos.y})`, new Vec2(cWidth - 8, 50));
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
