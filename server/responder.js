const path = require('path')
const paths = require('../config/paths')
const getMarkupWithAssets = require('./getMarkupWithAssets')

const filepath = path.resolve(paths.public, 'ssr.html')
const markup = getMarkupWithAssets(filepath)

module.exports = function(res) {
  return ({error, redirect, status, content}) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const html = markup
      .replace('___CONTENT___', content)

    return res.send(html)
  }
}
