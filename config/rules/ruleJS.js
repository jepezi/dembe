const paths = require('../paths')

const babelPresets = [
  [
    'env',
    {
      targets: {
        browsers: ['last 2 versions', 'ie >= 10']
      },
      modules: false,
      useBuiltIns: false,
      loose: true,
      debug: true
    }
  ],
  'stage-2',
  'react',
]

const transformRuntime = [
  'transform-runtime',
  {
    helpers: true,
    polyfill: false,
    regenerator: true // includes regenerator runtime
  }
]

const dev = {
  test: /.js$/,
  include: paths.src,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: babelPresets.concat(['react-hmre']),
        plugins: [transformRuntime],
      }
    }
  ]
}

module.exports = {
  dev
}
