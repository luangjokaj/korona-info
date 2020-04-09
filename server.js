
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackConfigProd = require('./webpack.config.prod');
const compiler = process.env.NODE_ENV === 'production' ? webpack(webpackConfigProd) : webpack(webpackConfig);
const app = express();
const port = process.env.PORT || 9000;

if (process.env.NODE_ENV !== 'production') {
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath,
	}));

	app.use(require("webpack-hot-middleware")(compiler));
}

app.use(express.static(path.join(__dirname, 'build')));


app.all('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

console.log(`Server listening on port \x1b[42m\x1b[1mhttp://localhost:${port}\x1b[0m 🌎...`);
