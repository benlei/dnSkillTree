// export express
var express = require('express')
var app = express()
module.exports = app;

// installed libs
var path = require('path')
var cookieParser = require('cookie-parser')
var router = express.Router()
var fs = require('fs')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// middleware
app.use(cookieParser())
app.use('/', router)

// custom libs
var dnss = require('./lib/dnss')
var db = require('./lib/db')(dnss.settings.db)
var jobs = []
for (i in db.Jobs) {
  jobs[i] = db.Jobs[i]
}

/* redirect to job with level specified */
router.get('/:job([a-z]+)', function(req, res) {
  res.redirect(302, '/' + req.params.job + '-' + db.Levels.length)
})

var default_build_path = Array(73).join('-');
router.get('/:job([a-z]+)-:level([0-9]+)', function(req, res) {
  res.redirect(301, '/' + req.params.job + '-' + req.params.level + '/' + default_build_path);
});

/* main simulator page */
var buildChars = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_";
var techChar = "!";
router.get('/:job([a-z]+)-:level([0-9]+)/:build([-_a-zA-Z0-9!]{72,})', function(req, res) {
  req.params.level = parseInt(req.params.level);
  if (req.params.level < 1 || req.params.level > db.Levels.length) throw "level " + req.params.level + " not found"
  var job = jobs.filter(function(j) { return j != null && j.JobNumber == 2 && j.EnglishName == req.params.job })[0]
  if (!job) throw "job " + req.params.job + " not found"

  res.render('simulator', {
    title: dnss.settings.title,
    jobs: jobs,
    cap: req.params.level,
    line: [jobs[jobs[job.ParentJob].ParentJob], jobs[job.ParentJob], job],
    fn: dnss.fn,
    sp_ratios: db.SP,
    levels: db.Levels,
    max_sp: db.Levels.slice(0, req.params.level).reduce(function(p,c) { return p+c }, 0)
  })
})