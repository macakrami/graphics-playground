/*
 * graphics-playground
 * webpack.config.js
 * Copyright (c) 2022 Mac Akrami
 * MIT Licensed
 */

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

// entry file path
const entryFilePath = resolve(__dirname, `src/index.js`);
// simple html template file path
const inputHtmlPath = resolve(__dirname, 'src/index.html');
// output dir path
const outputDirPath = resolve(__dirname, 'dist');
// output result html file name
const outputHtmlFilename = 'index.html';

// webpack config
module.exports = {
	
	target: ['web', 'es6'],

	entry: entryFilePath,

	output: {
		path: outputDirPath,
		filename: 'bundle.js',
		publicPath: '/'
	},
	
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			}
		]
	},
	
	plugins: [
		new HtmlWebpackPlugin({
			filename: outputHtmlFilename,
			template: inputHtmlPath,
			inject: 'body'
		}),
		new HtmlInlineScriptPlugin()
	],
	
	performance: {
		maxEntrypointSize: 1000000,
		maxAssetSize: 1000000,
	},
	
	devServer: {
		port: 3001,
		open: true,
	},
}
