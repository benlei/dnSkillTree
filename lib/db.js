module.exports = function(path) {
  var fs = require('fs')
  return JSON.parse(fs.readFileSync(path, 'utf8'))
}
