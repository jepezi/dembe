const paths = require('../paths')

const babelPresets = [
  'react',
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
        plugins: [
          'relay',
          // 'dual-import',
          transformRuntime,
        ],
      }
    }
  ]
}

const prod = {
  test: /.js$/,
  include: paths.src,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: babelPresets,
        plugins: [
          'relay',
          // 'dual-import',
          transformRuntime,
          'transform-react-inline-elements',
          'transform-react-pure-class-to-function',
          'transform-react-constant-elements'
        ]
      }
    }
  ]
}

const server = {
  test: /.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          [
            'env',
            {
              targets: {
                node: 'current'
              },
              modules: false,
              useBuiltIns: false,
              loose: true,
              debug: true,
            }
          ],
          'stage-2',
        ],
        plugins: [
          'relay',
          // 'dual-import',
          transformRuntime,
          'transform-class-properties',
          'transform-es2015-classes',
        ],
      },
    },
  ],
}

module.exports = {
  dev,
  prod,
  server,
}
