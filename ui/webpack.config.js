const HtmlWebpackPlugin=require('html-webpack-plugin')
const resolve = require('path').resolve;

// import React from 'react'
const React =require('react')
module.exports = {
  devtool: 'eval-source-map',
//   externals: {
//     'react': 'React'
// },
output: {
  // hotUpdateMainFilename: '[id].hot-update.[fullhash].json',
  // hotUpdateChunkFilename: '[id].hot-update.[fullhash].js',
  path: resolve(__dirname, 'dist'),
  filename: 'main.js',
},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}