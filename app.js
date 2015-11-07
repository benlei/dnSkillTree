var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var app = express()
var router = express.Router()
var fs = require('fs')
module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser())
app.use('/', router)

fs.readFile('/var/www/json/jobs.json', 'utf8', function(err, data) {
    if (err) throw err
    jobs = JSON.parse(data)
})

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Expressive', jobs: jobs })
})


