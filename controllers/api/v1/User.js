var models  = require('../../../models');
var bCrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');

exports.create = function(req, res){

	var generateHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
	};

	models.User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user){
		if(user){
			res.json({ status: 'KO', message: 'E-mail existente na base!' });
		}else{
			var userPassword = generateHash(req.body.password);
			var data = { email: req.body.email,
									 password: userPassword,
									 fullName: req.body.fullName,
									 lastName: req.body.lastName,
									 phone: req.body.phone
								 };
			models.User.create(data).then(function(newUser, created) {

				if (!newUser) { res.json({ status: 'KO', message: ''}); }
				if (newUser) { res.json({ status: 'OK', message: ''}); }
			})
			.catch(Sequelize.ValidationError, function (msg){
    		res.json({ status: 'KO', message: msg.errors });
  		})
		}
	})
}
