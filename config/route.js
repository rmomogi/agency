const path = require('path')

module.exports = function(app, passport) {

	app.get("/", function(req, res) {
		res.render('home', { message: ''});
	});

	app.get('/login', require(path.join(__dirname, '..' ,'controllers', 'Authentication')).login)
	app.get('/register', require(path.join(__dirname, '..' ,'controllers', 'Authentication')).register)
	app.get('/logout', require(path.join(__dirname, '..' ,'controllers', 'Authentication')).logout)

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.render('admin/index', {user: req.user})
	})

	app.post('/signin', passport.authenticate('local-signin', {
			successRedirect : '/dashboard', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
	}));

	app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/dashboard', // redirect to the secure profile section
			failureRedirect : '/register', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
	}));

	app.all('/services*', isLoggedIn, function (req, res, next) { next(); });		
	app.resource('services', require(path.join(__dirname, '..' ,'controllers', 'Service')))

	app.all('/sales*', isLoggedIn, function (req, res, next) { next(); });		
	app.resource('sales', require(path.join(__dirname, '..' ,'controllers', 'Sale')))
	

	// API
	app.get('/api/v1/services', require(path.join(__dirname, '..' ,'controllers', 'api', 'v1', 'Service')).all);
	
	app.post('/api/v1/sales', require(path.join(__dirname, '..' ,'controllers', 'api', 'v1', 'Sale')).create);
	//app.get('/api/v1/sales', require(path.join(__dirname, '..' ,'controllers', 'api', 'v1', 'Sale')).all);
	//app.get('/api/v1/sales/:id', require(path.join(__dirname, '..' ,'controllers', 'api', 'v1', 'Sale')).find);

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}
