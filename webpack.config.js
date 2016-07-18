var path = require('path');
var packageData = require('./package.json');
var filename = [packageData.name, packageData.version, 'js'];

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');



var plugins = [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'index.html',
      minify: {
        "collapseWhitespace": true, 
        "removeComments": true, 
        "removeRedundantAttributes": true, 
        "removeScriptTypeAttributes": true, 
        "removeStyleLinkTypeAttributes": true
      }
    }),
    new ExtractTextPlugin('style.css')
  ];

module.exports = {
    entry: {
      main: [
        path.resolve(__dirname, packageData.main)
      ]
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    plugins: plugins,
    module: {
      loaders: [
        { 
          test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "file-loader")
        },
        { test: /\.(jpe?g|png|git|svg)$/, loader: "file-loader"
        },
        {   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"
          },
        {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
          }
      ]
    }

};