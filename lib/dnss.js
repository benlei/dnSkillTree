// gets settings + a fn for templating
var fs = require('fs')
var path = require('path')
var settingsFile = process.env.DNSS ? process.env.DNSS : path.join(__dirname, '../dnss.json')
var settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'))
module.exports.settings = settings
module.exports.fn = new (
  function() {
    var thiz = this
    var static = settings.static

    this.url = {
      base: function() {
        return static.url
      },
      css: function(file) {
        return static.url + '/css' + (file ? '/' + file + '.css' : '')
      },
      js: function(file) {
        return static.url + '/js' + (file ? '/' + file + '.js' : '')
      },
      mainbar: function(file) {
        return static.url + '/' + static.path.mainbar + (file ? '/' + file + '.png' : '')
      },
      skill: function(file) {
        return static.url + '/' + static.path.skill + (file ? '/' + file + '.png' : '')
      },
      uitemplatetexture: function(file) {
        return static.url + '/' + static.path.uitemplatetexture + (file ? '/' + file + '.png' : '')
      },
      json: function(file) {
        return static.url + '/' + static.path.json + (file ? '/' + file + '.json' : '')
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