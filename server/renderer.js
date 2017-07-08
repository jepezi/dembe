const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const publicPath = path.resolve(root, 'public')
const filepath = path.resolve(publicPath, 'csr.dev.html')
const markup = fs.readFileSync(filepath, 'utf-8')

module.exports = (req, res, next) => {
  res.send(markup)
}
