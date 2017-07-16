const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')
const stat = require('../webpack-assets.json')

const webpackManifest = fs.readFileSync(
  path.join(paths.public, stat.manifest.js),
  'utf-8'
)

module.exports = function getMarkupWithAssets(filepath, options) {
  if (options && options.isClientRender) {
    return fs
      .readFileSync(filepath, 'utf-8')
      .replace('___CSS___', stat.main.css)
      .replace('___VENDOR___', stat.vendor.js)
      .replace('___MAIN___', stat.main.js)
      .replace('___INLINED_WEBPACK_MANIFEST___', webpackManifest)
  }
  return fs
    .readFileSync(filepath, 'utf-8')
    // .replace('___CSS___', stat.main.css)
    // .replace('___VENDOR___', stat.vendor.js)
    // .replace('___MAIN___', stat.main.js)
    .replace('___INLINED_WEBPACK_MANIFEST___', webpackManifest)
}
