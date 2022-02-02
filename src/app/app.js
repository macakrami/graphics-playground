/*
 * graphics-playground
 * app.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */


import XEngine from '../model/x-engine';
import Dom from '../model/dom';
import Configs from './configs';
import Views from './views';
import Linker from '../model/linker';
import EventManager from '../model/event-manager';


/**
 * Application class
 */
export default class App {
	
	/** @type {ViewAbstract[]} */
	viewInstances = [];
	
	/**
	 * Init event hooks
	 */
	constructor() {
		EventManager.listen(this, XEngine.E_INIT, this.onInit);
		EventManager.listen(this, XEngine.E_DRAW, this.onDraw);
		EventManager.listen(this, XEngine.E_STOP, this.onStop);
		EventManager.listen(this, XEngine.E_EXIT, this.onExit);
	}
	
	/**
	 * Main start
	 */
	start() {
		XEngine.init();
		XEngine.start();
	}
	
	/**
	 * Draw event handler
	 */
	onDraw() {
		this.viewInstances.forEach((view) => {
			// fix: when main stops engine,
			// further views will still try to render
			// so here making sure engine is running before calling
			// 'onDraw' on a view
			if (XEngine._running) {
				view.onDraw.apply(view, [XEngine.rcx]);
			}
		});
	}
	
	/**
	 * Engine initialized handler
	 * Apply configurations
	 */
	onInit() {
		
		// init cursor
		Dom.setCursor(!Configs.hideCursor);
		
		// init views
		this.viewInstances = Views.getInstances();
		
		XEngine.log('Main Initialized');
	}
	
	/**
	 * Engine stopped handler
	 */
	onStop() {
		XEngine.log('Stopped');
		Dom.setCursor(Configs.hideCursor);
	}
	
	/**
	 * Engine cleared out all resources handler
	 */
	onExit() {
		XEngine.log('Exited');
		Linker.showEndScreen(() => {
			Dom.clearMessage();
			this.start();
		});
	}
	
}
