//const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve('./lib'), path.resolve('./node_modules')],
  },
  entry: ['@babel/polyfill', './lib/renderers/dom.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
