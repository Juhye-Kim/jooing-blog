---
title: three.js로 태양계 만들기 - 1편
publish_date: 2022-08-03
background: white
cover_html: <img src="space/milkyway.jpeg" />
---

three.js를 이용해 태양계를 만들어보려고 한다.

# 기본 준비
### 패키지 설치하기
먼저 three.js, webpack, babel 등 필요한 패키지들을 설치한다.
```
$ npm i -D @babel/cli @babel/core @babel/preset-env babel-loader clean-webpack-plugin copy-webpack-plugin core-js cross-env html-webpack-plugin source-map-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server
$ npm i three
```
### webpack, babel 설정
webpack.config.js 파일과 babel.config.js 파일을 생성하고 아래 코드를 각각 복붙한다.
```
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
	mode: webpackMode,
	entry: {
		index: './src/index.js',
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].min.js'
	},
	devServer: {
		liveReload: true
	},
	optimization: {
		minimizer: webpackMode === 'production' ? [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true
					}
				}
			})
		] : [],
		splitChunks: {
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: process.env.NODE_ENV === 'production' ? {
				collapseWhitespace: true,
				removeComments: true,
			} : false
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/index.css", to: "./index.css" },
				// { from: "./src/images", to: "./images" },
				// { from: "./src/models", to: "./models" },
				// { from: "./src/sounds", to: "./sounds" }
			],
		})
	]
};
```
```
// babel.config.js
module.exports = {
	presets: [
		['@babel/preset-env', {
			targets: {
				chrome: '58',
				ie: '11',
			},
			useBuiltIns: 'usage',
			corejs: {
				version: 3,
			}
		}]
	]
};
```

### 파일 추가
기본 js, css 파일도 만들어준다. (위와 동일한 webpack 설정을 사용하려면 파일 구조를 아래와 같이 맞춰줘야 함)

### npm start
설치가 완료되었다면 package.json에 스크립트를 추가해주고, 개발용 서버를 구동해보자.
```
// package.json
  "scripts": {
    "start": "webpack serve --progress",
    "build": "cross-env NODE_ENV=production webpack --progress"
  },
```

```
$ npm build
$ npm start
```

### 파일 작성하기

최소한의 html, js, css 코드를 추가해준다.
### html
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Solar System💫</title>
		<link rel="stylesheet" type="text/css" href="./index.css">
	</head>
	<body>
        <canvas id="canvas"></canvas>
	</body>
</html>
```
### js

renderer, scene, camera는 필수요소이기 때문에 추가하고, 제대로 렌더링되는지 확인하기 위해 mesh도 하나 추가해준다.
```
import * as THREE from 'three';

// Renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;
scene.add(camera);

// Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 'white'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
css
body {
	margin: 0;
}
#canvas {
	position: absolute;
	left: 0;
	top: 0;
}
```

localhost:8080 에 접속했을 때 아래처럼 사각형이 있는 화면이 떴다면 성공!
<br>

<img width="250" alt="스크린샷 2022-08-03 오후 6 04 58" src="https://user-images.githubusercontent.com/63178953/182569695-adc1d9a3-2fc2-4091-93a7-90f680c199c0.png">

<br>
<br>