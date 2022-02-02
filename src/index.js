/*
 * graphics-playground
 * index.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

import './styles.scss';
import App from './app/app';

/*
	Notes:
	All views are registered in app/views.js
 */

// instantiate app and start
const app = new App();
app.start();
