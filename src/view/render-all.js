/*
 * graphics-playground
 * render-all.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import ViewAbstract from '../model/view-abstract';
import XGraph from '../model/x-graph';
import {Geometry, Line, Polygon, Triangle} from '../model/x-geo';

export default class RenderAll extends ViewAbstract {
	
	init() {}
	
	onDraw() {
		
		const {styler} = this.rcx;
		const {drawLines} = XGraph;
		
		
		// pull lines data
		
		/** @var {Line[]} */
		let rectLines = this.rcx.get('rect-lines');
		
		/** @var {Line[]} */
		let xLines = this.rcx.get('x-lines');
		
		/** @var {Line[]} */
		let xLines2 = this.rcx.get('x-lines-2');
		
		/** @var {Vec2[]} */
		let cPoints = this.rcx.get('c-points');
		
		// draw all
		
		// rectangle
		styler.color = '#e8e745';
		drawLines(rectLines);
		
		// rotating mouse X
		//styler.color = '#cef2fa';
		//drawLines(xLines);
		
		
		styler.color = '#0e0e0e';
		drawLines(xLines2);
		
		// colored dots
		let center = xLines[0].p1;
		let polygons = [
			new Polygon([center, xLines[0].p2, xLines[1].p2]),
			new Polygon([center, xLines[1].p2, xLines[2].p2]),
			new Polygon([center, xLines[2].p2, xLines[0].p2]),
		];
		let polygons_len = polygons.length;
		let colors = [
			'rgb(255,100,100)',
			'rgb(0,255,0)',
			'rgb(100,100,255)'
		];
		let getColor = (p) => {
			for (let pl = 0; pl < polygons_len; pl++) {
				if (Geometry.point_in_polygon(p, polygons[pl])) {
					return colors[pl];
				}
			}
			return '#232323';
		}
		
		
		// draw all dots
		let p, i, len = cPoints.length;
		styler.method = 'fill';
		for (i = 0; i < len; i++) {
			p = cPoints[i];
			styler.color = getColor(p);
			styler.drawDot(p.x, p.y, 2);
		}
		
		
	}
	
}
