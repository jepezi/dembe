const path = require('path')
const serialize = require('serialize-javascript')
const paths = require('../config/paths')
const getMarkupWithAssets = require('./getMarkupWithAssets')

const filepath = path.resolve(paths.public, 'ssr.html')
const markup = getMarkupWithAssets(filepath)

const publicPath = '/build/'

module.exports = function(res) {
  return ({
    error,
    redirect,
    status,
    content,
    scripts,
    stylesheets,
    reduxData,
    relayData,
  }) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    if (redirect) {
      return res.redirect(302, redirect.url)
    }

    const preloadJS = scripts.map(s =>
      `<link rel="preload" href="${publicPath}${s}" as="script">`
    ).join('\n')
    const preloadCSS = stylesheets.map(s =>
      `<link rel="preload" href="${publicPath}${s}" as="style">`
    ).join('\n')

    const html = markup
      .replace('___CONTENT___', content)
      .replace('___PRELOAD___', `${preloadJS}${preloadCSS}`)
      .replace('___SCRIPTS___', scripts.map(s =>
        `<script type='text/javascript' src='${publicPath}${s}'></script>`
      ).join('\n'))
      .replace('___STYLES___', stylesheets.map(s =>
        `<link rel='stylesheet' href='${publicPath}${s}' />`
      ).join('\n'))
      .replace('___REDUXDATA___', serialize(reduxData, { isJSON: true }))
      .replace('___RELAYDATA___', serialize(relayData, { isJSON: true }))

    return res.send(html)
  }
}
