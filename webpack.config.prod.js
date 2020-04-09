const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
	.default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
	mode: 'production',
	entry: {
		main: ['whatwg-fetch','./src/index.tsx'],
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].[contenthash].js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[hash:base64:5]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
						},
					},
				],
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
			},
			{
				test: /\.(ttf|eot|woff|woff2)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loaders: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
				],
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
			},
			{
				test: /\.(tsx|ts)?$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',
				options: {
					useCache: true,
					getCustomTransformers: () => ({
						before: [styledComponentsTransformer],
					}),
				},
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true,
		}),
		new CopyWebpackPlugin([
			{ context: './src/assets', from: '**', to: 'assets' },
		]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				WEBPACK: true,
			},
		}),
	],
};
