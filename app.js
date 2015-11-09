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

// settings json
var settings = JSON.parse(fs.readFileSync('/dnss/dnss.json', 'utf8'))

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

fs.readFile(settings.db, 'utf8', function(err, $) {
  if (err) throw err
  db = JSON.parse($)

  for (jobID in db.Jobs) {
    var job = db.Jobs[jobID]
    if (lastJobID < jobID) { // used to redirect to newest class
      lastJobID = jobID
    }
        
    if (job.JobNumber == 2) { // keep track of 2nd adv eng name for faster lookup
      routeJobs[job.EnglishName] = jobID
    }
  }
})

/* GET home page. */
router.get('/:job([a-z]+)-:level([1-9][0-9]*)', function(req, res) {
  if (!routeJobs[req.params.job]) throw "job " + req.params.job + " not found"

  res.render('index', { title: 'Dragon Nest Skill Simulator', db: db, settings: settings })
})


