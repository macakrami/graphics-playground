
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
	static _fullScreen = false;
	
	/**
	 * Engine initialized handler
	 * Apply configurations
	 */
	static onInit() {
		XGraph.styler.font = Configs.font;
		Dom.setCursor(!Configs.hideCursor);
		setTimeout(() => {
			if (confirm('Enter fullscreen mode ?')) {
				Linker.canvas.requestFullscreen()
					.then(() => {
						Main._fullScreen = true;
						XEngine.log('Entered fullscreen mode');
					})
					.catch(() => {
						Main._fullScreen = false;
					});
			}
		}, 2000);
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
			XEngine.stop();
			return;
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
		XGraph.drawText(`Esc to exit`, new Vec2(cWidth - 8, 75));
	}
	
	/**
	 * Main draw
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
