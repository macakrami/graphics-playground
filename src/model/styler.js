
export default class Styler {
	ctx;
	method;
	font;
	textAlign;
	lineWidth;
	
	constructor(options) {
		if (typeof options === 'object') {
			for (let k in options) {
				if (options.hasOwnProperty(k)) {
					this[k] = options[k];
				}
			}
		}
		if (!this.ctx) {
			throw new Error('No ctx');
		}
	}
	
	update() {
		if (this.method === 'fill') this.ctx.fillStyle = this.color;
		if (this.method === 'stroke') this.ctx.strokeStyle = this.color;
		if (this.font) this.ctx.font = this.font; //'24px Courier New';
		if (this.textAlign) this.ctx.textAlign = this.textAlign;
		if (this.lineWidth) this.ctx.lineWidth = this.lineWidth;
		//.lineCap = "butt" || "round" || "square";
	}
	
	draw() {
		this.update();
		if (this.method === 'fill') {
			this.ctx.fill();
		}
		if (this.method === 'stroke') {
			this.ctx.stroke();
		}
	}
	
	drawText(text, x, y) {
		this.update();
		if (this.method === 'fill') {
			this.ctx.fillText(text, x, y);
		}
		if (this.method === 'stroke') {
			this.ctx.strokeText(text, x, y);
		}
	}
	
}
