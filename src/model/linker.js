import Dom from './dom';

export default class Linker {
	/** @var {HTMLCanvasElement} */
	static canvas;
	/** @var {CanvasRenderingContext2D} */
	static ctx;
	
	static init() {
		this.canvas = Dom.createCanvas();
		this.ctx = this.canvas.getContext('2d');
		if (this.ctx === null) {
			throw new Error('Unable to create 2D context.');
		}
	}
	static attach(root) {
		root.append(this.canvas);
		Dom.register('resize', this.onResize);
		this.onResize();
	}
	static detach() {
		this.canvas.parentElement.removeChild(this.canvas);
		Dom.unregister('resize', this.onResize);
	}
	static clear() {
		this.ctx = null;
		this.canvas = null;
	}
	
	static onResize() {
		const {canvas} = Linker;
		canvas.width = Dom.getWidth();
		canvas.height = Dom.getHeight();
	}
	
}

