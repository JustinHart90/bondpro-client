import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = new WebpackConfig().merge({
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.main.js'
  },
  context:  path.join(__dirname,'/app'),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|svg|jpg|gif)$/,
        use: [
          'url-loader?limit=300',
          'img-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'ng-cache-loader?prefix=[dir]/[dir]'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015',
        exclude: /node_modules/
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'Home Page',
      template: 'index.ejs',
      favicon: './images/favicon.ico',
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {from: 'offline.html', to: 'offline.html'},
      {from: 'service-worker.js', to: 'service-worker.js'},
      {from: 'manifest.json', to: 'manifest.json'},
      {from: 'images/favicon.ico', to: 'images/favicon.ico'},
      {from: 'images/favicon.png', to: 'images/favicon.png'},
      {from: 'images/icon-128.png', to: 'images/icon-128.png'},
      {from: 'images/icon-144.png', to: 'images/icon-144.png'},
      {from: 'images/icon-152.png', to: 'images/icon-152.png'},
      {from: 'images/icon-192.png', to: 'images/icon-192.png'},
      {from: 'images/icon-256.png', to: 'images/icon-256.png'},
      {from: 'images/icon-512.png', to: 'images/icon-512.png'}
    ])
  ]
})
