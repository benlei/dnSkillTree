// export express
var express = require('express')
var app = express()
module.exports = app;

// installed libs
var compress = require('compression')
var path = require('path')
var cookieParser = require('cookie-parser')
var router = express.Router()
var fs = require('fs')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// middleware
app.use(compress())
app.use(cookieParser())
app.use('/', router)

// custom libs
var dnss = require('./lib/dnss')
var db = require('./lib/db')(dnss.settings.db)
var jobs = []
for (i in db.Jobs) {
  jobs[i] = db.Jobs[i]
}


var jobRoute = function(req, res) {
  if (req.params.level < 1 || req.params.level > db.Levels.length) throw "level " + req.params.level + " not found"
  var job = jobs.filter(function(j) { return j != null && j.JobNumber == 2 && j.EnglishName == req.params.job })[0]
  if (!job) throw "job " + req.params.job + " not found"
  
  res.render('simulator', {
    title: 'Dragon Nest Skill Simulator',
    jobs: jobs,
    cap: req.params.level,
    line: [jobs[jobs[job.ParentJob].ParentJob], jobs[job.ParentJob], job],
    fn: dnss.fn
  })
  
}

/* GET home page. */
router.get('/:job([a-z]+)', function(req, res) {
  req.params.level = db.Levels.length
  jobRoute(req, res)
})

router.get('/:job([a-z]+)-:level([1-9][0-9]*)', jobRoute)

