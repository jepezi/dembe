const ExtractTextPlugin = require('extract-text-webpack-plugin')
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

const cssModuleProd = {
  test: /\.module\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[hash:base64:8]',
          minimize: true
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
          includePaths: [paths.src],
        },
      },
    ],
  })
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

// any.scss (prod)
const globalProd = {
  test: /^((?!\.module\.).)*\.s?css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          localIdentName: '[hash:base64:8]',
          minimize: true,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: loader => [require('autoprefixer')()],
        }
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [paths.src],
        }
      },
    ],
  })
}

module.exports = {
  global: {
    dev: globalDev,
    prod: globalProd,
  },
  cssModule: {
    dev: cssModuleDev,
    prod: cssModuleProd,
  },
}
