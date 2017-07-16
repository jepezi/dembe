const path = require('path')
const serialize = require('serialize-javascript')
const paths = require('../config/paths')
const getMarkupWithAssets = require('./getMarkupWithAssets')

const filepath = path.resolve(paths.public, 'ssr.html')
const markup = getMarkupWithAssets(filepath)

module.exports = function(res) {
  return ({
    error,
    redirect,
    status,
    content,
    scripts,
    styles,
    reduxData,
    relayData,
  }) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const html = markup
      .replace('___CONTENT___', content)
      .replace('___SCRIPTS___', scripts.toString())
      .replace('___STYLES___', styles.toString())
      .replace('___REDUXDATA___', serialize(reduxData, { isJSON: true }))
      .replace('___RELAYDATA___', serialize(relayData, { isJSON: true }))

    return res.send(html)
  }
}
