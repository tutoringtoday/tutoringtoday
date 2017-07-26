require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'public/js/bundle.js',
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: process.env.NODE_ENV == 'development' ?
  [
    new ExtractTextPlugin({ filename: 'public/css/style.css' }),
    new CleanWebpackPlugin(['public/dist/css', 'public/dist/js'])
  ]
  :
  [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: 'public/css/style.css' }),
    new CleanWebpackPlugin(['public/dist/css', 'public/dist/js'])
  ]
};
