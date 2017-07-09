const paths = require('../paths')

// any.module.scss (dev)
const cssModuleDev = {
  test: /\.module\.s?css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [require('autoprefixer')()]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [paths.src]
      }
    }
  ]
}

// any.scss (dev)
const globalDev = {
  test: /^((?!\.module\.).)*\.s?css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [require('autoprefixer')()]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [paths.src]
      }
    }
  ]
}

module.exports = {
  global: {
    dev: globalDev,
  },
  cssModule: {
    dev: cssModuleDev,
  },
}
