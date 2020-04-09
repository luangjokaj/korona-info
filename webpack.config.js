const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
	.default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
	mode: 'development',
	entry: {
		index: [
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			'./src/index.tsx',
		],
	},
	devtool: 'inline-source-map',
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
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
					'css-hot-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: {
								mode: 'local',
								localIdentName:
									'[name]__[local]--[hash:base64:5]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							ident: 'postcss',
						},
					},
				],
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loaders: [
					'css-hot-loader',
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
				test: /\.(ttf|eot|woff|woff2)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
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
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
		new CopyWebpackPlugin([
			{ context: './src/assets', from: '**', to: 'assets' },
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css',
		}),
	],
};
