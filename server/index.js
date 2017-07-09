// @flow
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const compression = require('compression')
const renderer = require('./renderer')

const root = path.resolve(__dirname, '..')
const publicPath = path.resolve(root, 'public')

const app = express()
if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}
app.use(favicon(path.resolve(publicPath, 'favicon.ico')))
app.use(express.static(publicPath))
app.use(renderer)
app.listen(8000, () => {
  console.warn('running at http://localhost:8000')
})
