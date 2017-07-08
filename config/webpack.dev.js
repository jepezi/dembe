const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const ruleJS = require('./rules/ruleJS')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      require.resolve('./polyfills-client'),
      path.resolve(paths.src, 'index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(paths.root, 'public', 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      ruleJS.dev,
    ]
  },
  devServer: {
    port: 8001,
    inline: true
  }
}
