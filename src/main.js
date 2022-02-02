/*
 * graphics-playground
 * main.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import './styles.scss';
import XEngine from './model/x-engine';
import Configs from './configs';
import Dom from './model/dom';
import MainView from './view/main-view';
import EventManager from './model/event-manager';
import GeoFun from './view/geo-fun';
import CornerStats from './view/corner-stats';
import Linker from './model/linker';



class Main {
	
	/** @type {BaseView[]} */
	static viewInstances = [];
	
	/**
	 * Draw event handler
	 */
	static onDraw() {
		Main.viewInstances.forEach((view) => {
			if (XEngine._running) {
				view.onDraw.apply(view, []);
			}
		});
	}
	
	/**
	 * Engine initialized handler
	 * Apply configurations
	 */
	static onInit() {
		// init cursor
		Dom.setCursor(!Configs.hideCursor);
		// init views
		this.viewInstances = [
			new MainView(),
			new GeoFun(),
			new CornerStats(),
		];
		XEngine.log('Main Initialized');
	}
	
	/**
	 * Engine stopped handler
	 */
	static onStop() {
		XEngine.log('Stopped');
		Dom.setCursor(Configs.hideCursor);
	}
	
	/**
	 * Engine cleared out all resources handler
	 */
	static onExit() {
		XEngine.log('Exited');
		Linker.showEndScreen(() => {
			Dom.clearMessage();
			Main.start();
		});
	}
	
	/**
	 * Main start
	 */
	static start() {
		XEngine.init();
		XEngine.start();
	}
	
	/**
	 * Init event hooks
	 * called only once
	 */
	static init() {
		EventManager.listen(this, XEngine.E_INIT, this.onInit);
		EventManager.listen(this, XEngine.E_DRAW, this.onDraw);
		EventManager.listen(this, XEngine.E_STOP, this.onStop);
		EventManager.listen(this, XEngine.E_EXIT, this.onExit);
	}
}


Main.init();
Main.start();
