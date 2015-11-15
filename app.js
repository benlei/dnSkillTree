var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var app = express()
var router = express.Router()
var fs = require('fs')
var util = require('util')

module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cookieParser())
app.use('/', router)

// settings
var settings = JSON.parse(fs.readFileSync('/dnss/dnss.json', 'utf8'))
var static = {
  url: function() { return settings.static },
  css: function(path) { return settings.static+'/css/'+path+'.css' },
  js: function(path) { return settings.static+'/js/'+path+'.js' },
  jobicon: function(job) {
    return util.format("background-position:%dpx %dpx", job.IconCol * -28.5, job.IconRow * -28.5)
  },
  skillicon: function(skill) { if(skill) return util.format("background:url('%s/images/ui/mainbar/skillicon%s.png') %dpx %dpx", settings.static, skill.Sprite, skill.IconCol * -50, skill.IconRow * -50) },
  skilltree: function(job) { return util.format("background-image: url('%s/images/ui/skill/%s.png')", settings.static, job.EnglishName) }
}

//=======================================
// CUSTOM DATA GATHERING INTO MEM
//=======================================
// database of stuff
var db

// skills and skilltrees
var skills = {}

// route jobs
var routeJobs = {}

// the last job = show in index page
var lastJobID = 0

// the list of jobs
var jobs = []

fs.readFile(settings.db, 'utf8', function(err, $) {
  if (err) throw err
  db = JSON.parse($)

  for (jobID in db.Jobs) {
    var job = db.Jobs[jobID]
    jobs[jobID] = job
    
    if (lastJobID < jobID) { // used to redirect to newest class
      lastJobID = jobID
    }
        
    if (job.JobNumber == 2) { // keep track of 2nd adv eng name for faster lookup
      routeJobs[job.EnglishName] = jobID
    }

  }
})

var spriteImplode = function(skill) {
  return skill.Sprite + "," + skill.IconCol + "," + skill.IconRow
}

var jobRoute = function(req, res) {
  if (!routeJobs[req.params.job]) throw "job " + req.params.job + " not found"
  if (req.params.level < 1 || req.params.level > db.Levels.length) throw "level " + req.params.level + " not found"
  var job = jobs[routeJobs[req.params.job]]
  res.render('simulator',
             {
               title: 'Dragon Nest Skill Simulator',
               static: static,
               jobs: jobs,
               spriteImplode: spriteImplode,
               cap: req.params.level,
               line: [jobs[jobs[job.ParentJob].ParentJob], jobs[job.ParentJob], job]
             }
            )
}

/* GET home page. */
router.get('/:job([a-z]+)', function(req, res) {
  req.params.level = db.Levels.length
  jobRoute(req, res)
})

router.get('/:job([a-z]+)-:level([1-9][0-9]*)', jobRoute)

