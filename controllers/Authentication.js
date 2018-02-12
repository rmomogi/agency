exports.login = function(req, res){
	res.render('home', { message: req.flash('loginMessage') });
}

exports.register = function(req, res){	
	res.render('auth/register', { message: req.flash('signupMessage') });
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}