const isProd = process.env.NODE_ENV === 'production'

const renderer = isProd ? require('./csr.prod') : require('./csr.dev')

module.exports = renderer
