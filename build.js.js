const path = require('path');

module.exports = [{
  //mode: 'development',
  entry: {
  	"pw" : [
			'./src/scripts/pw.js'
		],
  	"modules/pokemon" : [
  		'./src/scripts/modules/pokemon.js'
  	],
  	"edit" : [
  		'./src/scripts/ext/edit/edit.js'
  	],
  	"modules/collapsiblelist" : './src/scripts/modules/collapsiblelist.js',
  	
  	
  },
  //devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].js'
  },
  module: {
		rules: [{
    	test: /\.js$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components|loadjs)/
		}]
  },
  resolve: {
    extensions: ['.ts', '.js'],
	  modules: [
	    path.resolve('./src'),
	  ]
	},
  devServer: {
    contentBase: './dist',
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8081,
    watchContentBase: true,
    compress: true
  },
}];
/*
*/