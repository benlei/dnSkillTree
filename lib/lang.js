var fs = require('fs')
var markdown = require( "markdown" ).markdown;

module.exports = function(region) {
  var lang = JSON.parse(fs.readFileSync(__dirname + '/../lang/' + region + '.json', 'utf8'))
  lang.home_body = markdown.toHTML(fs.readFileSync(__dirname + '/../lang/' + region + '.home.md', 'utf8'))
  return lang;
}