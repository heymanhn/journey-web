'use strict';
var webpack = require('webpack');
const API_SERVER = process.env.API_SERVER;

module.exports = {
  entry: './app/index.js',
  output: {
    filename: './app/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      API_SERVER: JSON.stringify(API_SERVER)
    })
  ],
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  watch: true,
  eslint: {
    configFile: './app/.eslintrc'
  }
};
