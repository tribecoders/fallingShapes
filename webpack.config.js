'use strict';

const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const plugins = [];

if (process.env.NODE_ENV === "production"){
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			},
			output: {
				comments:false
			}
		})
	);
} else {
	plugins.push(
		new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
				baseDir: ['build'] 
			}
		})
	);	
}

plugins.push(
	new WebpackNotifierPlugin({
		title: 'Pixi ES6 App',
		contentImage: path.join(__dirname, 'logo-pixijs-v4-es6.png')
	})
);

	
module.exports = {
	devtool: 'source-map',
	resolve: {
		alias: {
			'assets': path.resolve('./src/main/webapp/content')
		},
		extensions: ['.js'],
		modules: ['node_modules']
	},
	entry: {
		main: './src/index.js',
		'babel-polyfill': 'babel-polyfill',
	},
	output: {
		filename: 'build/app.js'
	},
  resolve: {
    extensions: ["", ".js"]
  },
	plugins: plugins,
	module: {
		preLoaders: [
			// Javascript
			{
				test: /\.jsx?$/, 
				loader: 'eslint-loader', 
				exclude: /node_modules/
			}
		],
	  rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
				options: {
					fix: true,
					failOnError: true
				}
			},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
				include: path.resolve('./')
				//exclude: ['./build/']
      },
		],
    eslint: {
			failOnWarning: false,
			failOnError: true
		},
	  postLoaders: [
      {
        loader: "transform/cacheable?brfs"
      }
    ],
		loaders: [
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0']
        }
			}
		]
	}
};
