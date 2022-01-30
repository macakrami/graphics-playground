
export default class Linker {
	static canvas;
	static ctx;
	
	static init() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		if (this.ctx === null) {
			throw new Error('Unable to create 2D context.');
		}
	}
	static attach(root) {
		root.append(this.canvas);
		window.addEventListener('resize', this.onResize, false);
		this.onResize();
	}
	static detach() {
		this.canvas.parentElement.removeChild(this.canvas);
		window.removeEventListener('resize', this.onResize);
	}
	static clear() {
		this.ctx = null;
		this.canvas = null;
	}
	
	static onResize() {
		const {canvas} = Linker;
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
	}
	
}

