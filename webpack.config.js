module.exports = {
	mode: 'development',
	entry: './js/news-block.js',
	output: {
		path: __dirname,
		filename: 'js/news-block.build.js',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	devtool: "inline-source-map",
};
