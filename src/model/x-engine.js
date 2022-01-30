
import Linker from './linker';
import XMouse from './x-mouse';
import XGraph from './x-graph';
import XKeyboard from './x-keyboard';

export default class XEngine {
	static _onDraw;
	static _onStop;
	static _onExit;
	static _running = false;
	
	static init(onInit, onDraw, onStop, onExit, root) {
		this.log('Initializing...');
		this._onDraw = onDraw;
		this._onStop = onStop;
		this._onExit = onExit;
		Linker.init();
		Linker.attach(root);
		XGraph.init();
		onInit();
	}
	
	static start() {
		if (this._running) {
			return;
		}
		this._running = true;
		XKeyboard.enable();
		XMouse.enable();
		this.startLoop();
		this.log('Started');
	}
	
	static stop() {
		if (!this._running) {
			return;
		}
		this._running = false;
		this.log('Stopping...');
		XMouse.disable();
		XKeyboard.disable();
		this._onStop();
	}
	
	static clear() {
		this.stop();
		XGraph.clear();
		Linker.detach();
		Linker.clear();
		this._onExit();
	}
	
	static startLoop() {
		let now, delta, lastDraw = new Date();
		const loop = () => {
			if (!XEngine._running) {
				return;
			}
			now = new Date();
			delta = (now - lastDraw);
			lastDraw = now;
			XEngine._onDraw(now, delta);
			window.requestAnimationFrame(loop);
		};
		window.requestAnimationFrame(loop);
	}
	
	static log() {
		let args = Array.prototype.slice.call(arguments);
		args.unshift('XEngine:');
		console.log.apply(this, args);
	}
	
}
