const express 				= require('express');
const session 				= require('express-session');
const Resource 				= require('express-resource');
const methodOverride 	= require('method-override');
const morgan       		= require('morgan');
const path 						= require('path');
const app 						= express();
const passport 				= require('passport');
const OAuthServer 		= require('express-oauth-server');

var bodyParser				= require('body-parser');
var models 						= require('../models');
var cors 							= require('cors');
var cookieSession 		= require('cookie-session')

app.use(morgan('dev')); // log every request to the console
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

// session support
app.use(cookieSession({
  name: 'session',
  keys: ['gorgonzola', 'mussarela'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(require('connect-flash')());
app.use(passport.initialize());
app.use(passport.session()); // persistent login session

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.locals.currentUser = req.user;
  next();
})

require(path.join(__dirname, '..', 'config', 'auth.js'))(passport, models.User)
require(path.join(__dirname, '..', 'config', 'route.js'))(app, passport)

app.listen(80, function(){
	console.log('Application listening port 80');
});