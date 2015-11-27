module.exports = function(region) {
  var fs = require('fs')
  return JSON.parse(fs.readFileSync(__dirname + '/../lang/' + region + '.json', 'utf8'))
}