/*
 * graphics-playground
 * main.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

import './styles.css';
import XEngine from './model/x-engine';
import XGraph from './model/x-graph';
import {Vec2, XMath} from './model/x-math';
import XMouse from './model/x-mouse';
import XKeyboard from './model/x-keyboard';
import Configs from './configs';
import Linker from './model/linker';
import Dom from './model/dom';


class Main {
	
	
	static inFullscreen = false;
	
	static toggleFullscreen() {
		const handler = (enabled) => {
			if (enabled !== null) {
				Main.inFullscreen = enabled;
				XEngine.log((enabled ? 'Entered' : 'Exited') + ' fullscreen.');
			}
		};
		if (this.inFullscreen) {
			Linker.exitFullscreenMode(handler);
		} else {
			Linker.enterFullscreenMode(handler);
		}
	}
	
	
	/**
	 * Engine initialized handler
	 * Apply configurations
	 */
	static onInit() {
		XGraph.styler.font = Configs.font;
		Dom.setCursor(!Configs.hideCursor);
	}
	
	/**
	 * Draw handler
	 *
	 * @param now
	 * @param delta
	 */
	static onDraw(now, delta) {
		
		// Esc to exit
		if (XKeyboard.isPressed(XKeyboard.KEY.DOM_VK_ESCAPE)) {
			XEngine.stop();
			return;
		}
		
		// F to Fullscreen
		if (XKeyboard.isPressed(XKeyboard.KEY.DOM_VK_F)) {
			Main.toggleFullscreen();
		}
		
		// constants
		const {canvas, ctx} = Linker;
		const {width: cWidth, height: cHeight} = canvas;
		const mousePos = XMouse.position;
		
		// clear
		XGraph.clearRect();
		
		// main draw
		Main.mainDrawII(now, delta);
		
		// FPS
		XGraph.styler.color = '#ffffff';
		XGraph.styler.textAlign = 'right';
		XGraph.drawText('FPS: ' + XMath.fps(delta), new Vec2(cWidth - 8, 25));
		
		// CURSOR
		if (Configs.hideCursor && Configs.customCursor) {
			XGraph.drawPolyline([mousePos.add(3, 15), mousePos, mousePos.add(12, 8)], true);
		}
		XGraph.drawText(`(${mousePos.x}, ${mousePos.y})`, new Vec2(cWidth - 8, 50));
		
		// info
		XGraph.drawText(`Esc = exit`, new Vec2(cWidth - 8, 75));
		let fs = Main.inFullscreen ? '1' : '0';
		XGraph.drawText(`F = Toggle Fullscreen (${fs})`, new Vec2(cWidth - 8, 100));
	}
	
	/**
	 * Main draw
	 * reserved for rendering the good stuff
	 *
	 * @param now
	 * @param delta
	 */
	static mainDrawII(now, delta) {
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
