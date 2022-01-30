
import './styles.css';
import XEngine from './model/x-engine';
import XGraph from './model/x-graph';
import {Vec2, XMath} from './model/x-math';
import XMouse from './model/x-mouse';
import XKeyboard from './model/x-keyboard';
import Styler from './model/styler';
import Linker from './model/linker';


class Main {
	
	// INIT
	static onInit() {
		const {ctx} = Linker;
		
		const styler = new Styler({
			ctx: ctx,
			method: 'stroke',
			color: '#fff',
			lineWidth: 1
		});
		styler.font = '18px Courier New';
		XGraph.styler = styler;
	}
	
	// DRAW
	static onDraw(now, delta) {
		const {canvas, ctx, styler} = XGraph;
		const {width: cWidth, height: cHeight} = canvas;
		
		// Esc to exit
		if (XKeyboard.isDown(XKeyboard.KEY.DOM_VK_ESCAPE)) {
			XEngine.clear();
			return;
		}
		
		// clear
		XGraph.clearRect();
		
		// FPS
		styler.color = '#ffffff';
		styler.textAlign = 'right';
		XGraph.drawText('FPS: ' + XMath.fps(delta), new Vec2(cWidth - 8, 24));
		
		const mousePos = XMouse.position;
		XGraph.drawText(`(${mousePos.x}, ${mousePos.y})`, new Vec2(cWidth - 8, 50));
		XGraph.drawCircle(mousePos, 10);
		
	}
	
	static onStop() {
		XEngine.log('Stopped');
	}
	static onExit() {
		XEngine.log('Exited');
	}
	
	static run() {
		XEngine.init(this.onInit, this.onDraw, this.onStop, this.onExit, document.getElementById('root'));
		XEngine.start();
	}
	
}

// RUN
Main.run();
