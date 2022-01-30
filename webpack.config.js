
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');


const entryFilePath = resolve(__dirname, `src/main.js`);
const inputHtmlPath = resolve(__dirname, 'src/index.html');
const outputDirPath = resolve(__dirname, 'dist');
const outputHtmlFilename = 'index.html';


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
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
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

