/*
 * graphics-playground
 * x-graph.js
 * Copyright (c) 2022 Mac Akrami
 * GPL Licensed
 */

import {Frame, Vec2} from './x-geo';
import Styler from './styler';
import Linker from './linker';

// REView
export default class XGraph {
	
	/** @var {Styler} */
	static styler;
	
	static init() {
		this.initStyler();
	}
	
	static initStyler() {
		this.styler = new Styler({
			ctx: Linker.ctx,
			method: 'stroke',
			color: '#fff',
			lineWidth: 1
		});
	}
	
	static clear() {
		this.styler = null;
	}
	
	/**
	 * @param {Vec2} p1
	 * @param {Vec2} p2
	 * @param {Vec2} p3
	 * @param {Vec2} p4
	 */
	static drawRectangle(p1, p2, p3, p4) {
		this.drawPolyline([p1, p2, p3, p4], true);
	}
	
	/**
	 *
	 * @param {Frame} frame
	 */
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
		this.styler.ctx.beginPath();
		this.styler.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
		this.styler.draw();
	}
	
	static drawText(text, p) {
		this.styler.drawText(text, p.x, p.y);
	}
	
	static drawPolyline(points, shouldClose) {
		let i, p, len = points.length;
		this.styler.ctx.beginPath();
		for (i = 0; i < len; i++) {
			p = points[i];
			if (i === 0) {
				this.styler.ctx.moveTo(p.x, p.y);
			} else {
				this.styler.ctx.lineTo(p.x, p.y);
			}
		}
		if (shouldClose) this.styler.ctx.closePath();
		this.styler.draw();
	}
	
	static drawLine(line) {
		this.styler.ctx.beginPath();
		this.styler.ctx.moveTo(line.p1.x, line.p1.y);
		this.styler.ctx.lineTo(line.p2.x, line.p2.y);
		this.styler.draw();
	}
	
	static drawTriangle(tri) {
		this.styler.ctx.beginPath();
		this.styler.ctx.moveTo(tri.p1.x, tri.p1.y);
		this.styler.ctx.lineTo(tri.p2.x, tri.p2.y);
		this.styler.ctx.lineTo(tri.p3.x, tri.p3.y);
		this.styler.ctx.closePath();
		this.styler.draw();
	}
	
	static drawPoint(p, color) {
		if (color) {
			this.styler.ctx.fillStyle = color;
			this.styler.ctx.lineWidth = 1;
		}
		this.styler.ctx.fillRect(p.x, p.y, 1, 1);
	}
	
	static clearRect(color) {
		this.styler.ctx.fillStyle = color || '#000';
		this.styler.ctx.fillRect(0, 0, Linker.canvas.width, Linker.canvas.height);
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
