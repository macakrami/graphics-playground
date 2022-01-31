
import {Frame, Vec2} from './x-math';
import Styler from './styler';
import Linker from './linker';

// REView
export default class XGraph {
	
	static canvas;
	static ctx;
	/** @var {Styler} */
	static styler;
	
	static init() {
		const {canvas, ctx} = Linker;
		this.canvas = canvas;
		this.ctx = ctx;
		this.styler = new Styler({
			ctx: this.ctx,
			method: 'stroke',
			color: '#fff',
			lineWidth: 1
		});
	}
	
	static clear() {
		this.ctx = null;
		this.styler = null;
	}
	
	static drawRectangle(p1, p2, p3, p4) {
		this.drawPolyline([p1, p2, p3, p4], true);
	}
	
	static drawFrame(frame) {
		let x1 = frame.point.x;
		let y1 = frame.point.y;
		let x2 = x1 + frame.size.x;
		let y2 = y1 + frame.size.y;
		this.styler.ctx.beginPath();
		this.styler.ctx.moveTo(x1, y1);
		this.styler.ctx.lineTo(x2, y1);
		this.styler.ctx.lineTo(x2, y2);
		this.styler.ctx.lineTo(x1, y2);
		this.styler.ctx.closePath();
		this.styler.draw();
	}
	
	static drawCircle(p, radius) {
		this.ctx.beginPath();
		this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
		this.styler.draw();
	}
	
	static drawText(text, p) {
		this.styler.drawText(text, p.x, p.y);
	}
	
	static drawPolyline(points, shouldClose) {
		let i, p, len = points.length;
		this.ctx.beginPath();
		for (i = 0; i < len; i++) {
			p = points[i];
			if (i === 0) {
				this.ctx.moveTo(p.x, p.y);
			} else {
				this.ctx.lineTo(p.x, p.y);
			}
		}
		if (shouldClose) this.ctx.closePath();
		this.styler.draw();
	}
	
	static drawLine(line) {
		this.ctx.beginPath();
		this.ctx.moveTo(line.p1.x, line.p1.y);
		this.ctx.lineTo(line.p2.x, line.p2.y);
		this.styler.draw();
	}
	
	static drawTriangle(tri) {
		this.ctx.beginPath();
		this.ctx.moveTo(tri.p1.x, tri.p1.y);
		this.ctx.lineTo(tri.p2.x, tri.p2.y);
		this.ctx.lineTo(tri.p3.x, tri.p3.y);
		this.ctx.closePath();
		this.styler.draw();
	}
	
	static drawPoint(p, color) {
		if (color) {
			this.ctx.fillStyle = color;
			this.ctx.lineWidth = 1;
		}
		this.ctx.fillRect(p.x, p.y, 1, 1);
	}
	
	static clearRect(color) {
		this.ctx.fillStyle = color || '#000';
		this.ctx.fillRect(0, 0, Linker.canvas.width, Linker.canvas.height);
	}
	
	static drawLineAsRectangle(line) {
		let x1 = line.p1.x;
		let y1 = line.p1.y;
		let x2 = line.p2.x;
		let y2 = line.p2.y;
		let diffX = x2 - x1;
		let diffY = y2 - y1;
		let p1 = line.p1;
		let p2 = p1.add(diffX, 0);
		let p3 = line.p2;
		let p4 = p1.add(0, diffY);
		this.drawRectangle(p1, p2, p3, p4);
	}
	
	static getMainFrame() {
		return new Frame(0, 0, Linker.canvas.width, Linker.canvas.height);
	}
	
	static getCenterFrame(width, height) {
		let x = (Linker.canvas.width - width) / 2;
		let y = (Linker.canvas.height - height) / 2;
		return new Frame(x, y, width, height);
	}
	
	static getCanvasSize() {
		return new Vec2(Linker.canvas.width, Linker.canvas.height);
	}
	
}
