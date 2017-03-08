var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LEVEL_CAP: '93',
  BUILD_VERSION: '591',
})
