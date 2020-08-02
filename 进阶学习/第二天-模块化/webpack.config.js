const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const webpack = require('webpack');

const resolve = function(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devServer: {
    port: 8000,
    hot: true,
    compress: true,
    contentBase: path.join(__dirname, 'dist')
  }
}