// @flow
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const compression = require('compression')
const proxy = require('http-proxy-middleware')
const renderer = require('./renderer')
const paths = require('../config/paths')
const cache = require('./cache')

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}
app.use(favicon(path.resolve(paths.public, 'favicon.ico')))
app.use('/api', proxy({target: 'http://localhost:3000', changeOrigin: true}))
app.use(express.static(paths.public))
app.use(cache(10), renderer)
app.listen(8000, () => {
  console.warn('running at http://localhost:8000')
})
