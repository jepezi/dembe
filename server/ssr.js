const path = require('path')
const responder = require('./responder')
const paths = require('../config/paths')

// Require matchRoute from build
const matchRoute = require(
  path.resolve(paths.build, 'js/matchRoute.js')
).default

const stats = require('../public/build/stats.json')

module.exports = function(req, res) {
  return matchRoute(req, {stats})
    .then(responder(res))
}
