'use strict';

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
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  watch: true,
  eslint: {
    configFile: './app/.eslintrc'
  }
};
