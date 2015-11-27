// gets settings + a fn for templating
var fs = require('fs')
var path = require('path')
var settingsFile = process.env.DNSS ? process.env.DNSS : path.join(__dirname, '../dnss.json')
var settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'))

module.exports.settings = settings
module.exports.fn = new (
  function() {
    var thiz = this, uri = settings.uri
    for (key in uri) {
      uri[key] = uri[key].replace('$server', settings.server).replace('$static', settings['static'])
    }

    this.url = {
      css: function(file) {
        return uri.css + (file ? '/' + file + '.css' : '')
      },
      js: function(file) {
        return uri.js + (file ? '/' + file + '.js' : '')
      },
      mainbar: function(file) {
        return uri.mainbar + (file ? '/' + file + '.png' : '')
      },
      skill: function(file) {
        return uri.skill + (file ? '/' + file + '.png' : '')
      },
      uitemplatetexture: function(file) {
        return uri.uitemplatetexture + (file ? '/' + file + '.png' : '')
      },
      json: function(file) {
        return uri.json + (file ? '/' + file + '.json' : '')
      }
    }

    this.image = {
      job: function(job) {
        var col = job.IconCol * -28.5,
            row = job.IconRow * -28.5
        return 'background-position:' + col + 'px ' + row + 'px'
      },
      skilltree: function(job) {
        return 'background-image:url(' + thiz.url.skill(job.EnglishName) +')'
      }
    }
  }
)