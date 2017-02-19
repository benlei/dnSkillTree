var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  ASSETS_URL: 'http://localhost:8080',
  BUILD_VERSION: 584,
});
