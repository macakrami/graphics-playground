/*
 * graphics-playground
 * x-graph.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import {Frame, Polygon, Line, Triangle, Vec2} from './x-geo';
import Styler from './styler';
import Linker from './linker';
import XMath from './x-math';

/**
 * Function pack for 2D drawings.
 *
 * This class is static, mainly because its methods
 * will be called in a way that 'this' will not be passed in.
 * Simply getting around having to bind every method to 'this'.
 */
export default class XGraph {
	
	/** @type {Styler} */
	static styler;
	/** @type {CanvasRenderingContext2D} */
	static ctx;
	
	/**
	 * Initialize XGraph
	 */
	static init() {
		XGraph.ctx = Linker.ctx;
		XGraph.styler = new Styler({
			ctx: Linker.ctx,
			method: 'stroke',
			color: '#fff',
			lineWidth: 1
		});
	}
	
	static clear() {
		XGraph.styler = null;
	}
	
	/**
	 * @param {Vec2} p1
	 * @param {Vec2} p2
	 * @param {Vec2} p3
	 * @param {Vec2} p4
	 */
	static drawRectangle(p1, p2, p3, p4) {
		XGraph.drawPolyline([p1, p2, p3, p4], true);
	}
	
	/**
	 * @param {Frame} frame
	 */
	static drawFrame(frame) {
		const {styler, ctx} = XGraph;
		let x1 = frame.point.x;
		let y1 = frame.point.y;
		let x2 = x1 + frame.size.x;
		let y2 = y1 + frame.size.y;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x1, y2);
		ctx.closePath();
		styler.draw();
	}
	
	/**
	 * @param {Vec2} p
	 * @param {number} radius
	 */
	static drawCircle(p, radius) {
		const {styler, ctx} = XGraph;
		ctx.beginPath();
		ctx.arc(p.x, p.y, radius, 0, XMath.PIx2);
		styler.draw();
	}
	
	/**
	 * @param {string} text
	 * @param {Vec2} p
	 */
	static drawText(text, p) {
		XGraph.styler.drawText(text, p.x, p.y);
	}
	
	/**
	 * @param points
	 * @param shouldClose
	 */
	static drawPolyline(points, shouldClose) {
		const {styler, ctx} = XGraph;
		let i, p, len = points.length;
		ctx.beginPath();
		for (i = 0; i < len; i++) {
			p = points[i];
			if (i === 0) {
				ctx.moveTo(p.x, p.y);
			} else {
				ctx.lineTo(p.x, p.y);
			}
		}
		if (shouldClose) ctx.closePath();
		styler.draw();
	}
	
	/**
	 * @param {Polygon} poly
	 */
	static drawPolygon(poly) {
		XGraph.drawPolyline(poly.ps, true);
	}
	
	/**
	 * @param {Line} line
	 */
	static drawLine(line) {
		const {styler, ctx} = XGraph;
		ctx.beginPath();
		ctx.moveTo(line.p1.x, line.p1.y);
		ctx.lineTo(line.p2.x, line.p2.y);
		styler.draw();
	}
	
	/**
	 * @param {Line[]} lines
	 */
	static drawLines(lines) {
		let i, len = lines.length;
		for (i = 0; i < len; i++) {
			XGraph.drawLine(lines[i]);
		}
	}
	
	/**
	 * @param {Triangle} tri
	 */
	static drawTriangle(tri) {
		const {styler, ctx} = XGraph;
		ctx.beginPath();
		ctx.moveTo(tri.p1.x, tri.p1.y);
		ctx.lineTo(tri.p2.x, tri.p2.y);
		ctx.lineTo(tri.p3.x, tri.p3.y);
		ctx.closePath();
		styler.draw();
	}
	
	/**
	 * @param {Vec2} p
	 */
	static drawPoint(p) {
		XGraph.styler.drawDot(p.x, p.y);
	}
	
	/**
	 * @param {string} [color] Html color
	 */
	static clearRect(color) {
		const {ctx} = XGraph;
		ctx.fillStyle = color || '#000';
		ctx.fillRect(0, 0, Linker.canvas.width, Linker.canvas.height);
	}
	
	/**
	 * @param {Line} line
	 */
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
		XGraph.drawRectangle(p1, p2, p3, p4);
	}
	
	/**
	 * @returns {Frame}
	 */
	static getMainFrame() {
		return new Frame(0, 0, Linker.canvas.width, Linker.canvas.height);
	}
	
	/**
	 * @param {number} width
	 * @param {number} height
	 * @returns {Frame}
	 */
	static getCenterFrame(width, height) {
		let x = (Linker.canvas.width - width) / 2;
		let y = (Linker.canvas.height - height) / 2;
		return new Frame(x, y, width, height);
	}
	
	/**
	 * @returns {Vec2}
	 */
	static getCanvasSize() {
		return new Vec2(Linker.canvas.width, Linker.canvas.height);
	}
	
}
