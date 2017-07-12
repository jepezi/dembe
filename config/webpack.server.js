const webpack = require('webpack')
const path = require('path')
const paths = require('./paths')
const nodeExternals = require('webpack-node-externals')
const ruleJS = require('./rules/ruleJS')
const ruleCSS = require('./rules/ruleCSS')
const ruleStatic = require('./rules/ruleStatic')

module.exports = {
  bail: true,
  target: 'node',
  entry: {
    main: [
      require.resolve('./polyfills-server'),
      path.resolve(paths.root, 'server', 'matchRoute.js')
    ]
  },
  output: {
    path: paths.build,
    filename: 'js/matchRoute.js',
    publicPath: '/build/',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals({
    whitelist: [/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/],
  })],
  module: {
    rules: [
      ruleJS.server,
      ruleCSS.global.server,
      ruleCSS.cssModule.server,
      ruleStatic,
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
  ],
}
