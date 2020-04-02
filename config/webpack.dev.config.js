// const devMode = process.env.NODE_ENV === 'development';
const path = require('path');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

const config = {
  mode: 'development',
  entry : {
    index: path.resolve(__dirname, '../src/index.js'),
    vander: ['vue', 'axios']
  },
  output: {
    path: '/dist',
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    proxy: {
        '/login/*': {
          target: 'https://github.com',
          changeOrigin: true
        }
      }
  }
}

module.exports = merge(baseConfig, config);