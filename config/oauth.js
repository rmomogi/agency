var models = require('../models')

/*
 * Get access token.
 */

var getAccessToken = function(bearerToken, callback) {

	models.OAuthToken.findOne({
		accessToken: bearerToken
	}, callback);
};

/**
 * Get client.
 */

var getClient = function(clientId, clientSecret, callback) {
	models.OAuthClient.findOne({
		where:{
			clientId: clientId,
			clientSecret: clientSecret
		}
	})
	.then(function(result){
		if(!result){
			return false;
		}
		return {
      clientId: result.clientId,
      clientSecret: result.clientSecret,
      grants: ['password'], // the list of OAuth2 grant types that should be allowed
    };
	});
};

/**
 * Grant type allowed.
 */

var grantTypeAllowed = function(clientId, grantType, callback) {

	callback(false, grantType === "password");
};

/**
 * Save token.
 */

var saveAccessToken = function(accessToken, clientId, expires, user, callback) {

	var token = new models.OAuthToken({
		accessToken: accessToken,
		expires: expires,
		client_id: clientId,
		user_id: user.id
	});

	token.save(callback);
};

/*
 * Get user.
 */

var getUser = function(email, password, callback) {
  User.findOne({
  	where: {
  		email: email
  	}
  }).then(function(user){
  	if(!user){
  		return false
  	}

  	if(!bCrypt.compareSync(user.password, password)) {
			return false
    }

    return user.get();
  }).catch(function(err){
  	console.log("Error:", err);        
  });;
};

/**
 * Export model definition object.
 */

module.exports = {
	getAccessToken: getAccessToken,
	getClient: getClient,
	grantTypeAllowed: grantTypeAllowed,
	saveAccessToken: saveAccessToken,
	getUser: getUser
};