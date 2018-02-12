var passport = require('passport')
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user){

	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	// used to serialize the user for the session
  passport.serializeUser(function(user, done) {
  	done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {  	
    User.findById(id)
    .then(function(user) {
    	done(null, user);
    });
  });

	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

			User.findOne({
				where: {
					email: email
				}
			}).then(function(user){
				if(user){
					return done(null, false, req.flash('signupMessage', 'Este e-mail existe na base'))
				}else{
					var userPassword = generateHash(password);
					var data = { email: email,
											 password: userPassword,
											 firstName: req.body.firstName,
											 lastName: req.body.lastName,
											 phone: req.body.phone
										 };
					User.create(data).then(function(newUser, created) {
						if (!newUser) { return done(null, false); }
						if (newUser) { return done(null, newUser); }
					});
				}
			})
			.catch(function(err){
      	console.log("Error:", err);
        return done(null, false, req.flash('signupMessage', 'Problema na autenticação do sistema. Tente novamente.')); 
      });
		}
	))

	passport.use('local-signin', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		},
		function(req, email, password, done){

			var isValidPassword = function(userpass, password) {
 	     return bCrypt.compareSync(password, userpass);
      }

      User.findOne({
      	where: {
      		email: email
      	}
      }).then(function(user){
      	if(!user){
      		return done(null, false, req.flash('loginMessage', 'Email não existe'));
      	}

      	if(!isValidPassword(user.password, password)) {
					return done(null, false, req.flash('loginMessage', 'Senha incorreta'));
        }

        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err){
      	console.log("Error:", err);        
      });
		}
	))
}


