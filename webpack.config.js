module.exports = {
	entry: './js/news-block.js',
	output: {
		path: __dirname,
		filename: 'js/news-block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
