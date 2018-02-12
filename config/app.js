const express = require('express')
const session = require('express-session')
const Resource = require('express-resource')
const methodOverride = require('method-override')
const morgan       = require('morgan');
const fs = require('fs')
const path = require('path')

const app = express()
const passport = require('passport')

var models = require('../models')

app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'library'
}));
app.use(require('connect-flash')());
app.use(passport.initialize());
app.use(passport.session()); // persistent login session

require(path.join(__dirname, '..', 'config', 'auth.js'))(passport, models.User)
require(path.join(__dirname, '..', 'config', 'route.js'))(app, passport)

app.listen(8080, function(){
	console.log('Application listening port 8080');
});