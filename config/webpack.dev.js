const webpack = require('webpack')
const path = require('path')

const root = path.resolve(__dirname, '..')
const srcPath = path.resolve(root, 'web')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      require.resolve('./polyfills-client'),
      path.resolve(srcPath, 'index.js')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(root, 'public', 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-2', 'react']
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8001,
    inline: true
  }
}
