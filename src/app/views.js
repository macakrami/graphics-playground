/*
 * graphics-playground
 * views.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import XEngine from '../model/x-engine';
import MainView from '../view/main-view';
import CornerStats from '../view/corner-stats';
import CenterRectangle from '../view/center-rectangle';
import RotatingTriangle from '../view/rotating-triangle';
import RenderAll from '../view/render-all';
import ColoredDots from '../view/colored-dots';


/**
 * View registry
 */
export default class Views {
	
	/**
	 * View registry
	 * Add all views here to be rendered in order
	 *
	 * @type {array}
	 */
	static list = [
		
		MainView,
		
		CenterRectangle,
		RotatingTriangle,
		ColoredDots,
		RenderAll,
		
		CornerStats
	];
	
	
	/**
	 * Instantiate and initialize all views in order
	 *
	 * @return {ViewAbstract[]}
	 */
	static getInstances() {
		let instantiated = [];
		const {rcx} = XEngine;
		this.list.forEach((View, index) => {
			let instance = new View();
			instance.rcx = rcx;
			instance.renderIndex = index;
			instantiated.push(instance);
			instance.init();
		});
		return instantiated;
	}
	
}
