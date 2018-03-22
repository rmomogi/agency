var models = require('../models')
var bCrypt = require('bcrypt-nodejs');
var _ = require('lodash');
const Sequelize = require('sequelize');

/*
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
	return models.OAuthToken
    .findOne({
      where: {access_token: bearerToken},
      attributes: [['access_token', 'accessToken'], ['access_token_expires_on', 'accessTokenExpiresAt'],'scope'],
      include: [
        {
          model: models.User,
          attributes: ['id', 'email'],
        }, models.OAuthClient
      ],
    })
    .then(function (accessToken) {
      if (!accessToken) return false;
      var token = accessToken.toJSON();
      token.user = token.User;
      token.client = token.OAuthClient;
      token.scope = token.scope
      return token;
    })
    .catch(function (err) {
      console.log("getAccessToken - Err: " + err)
    });
};

/**
 * Get client.
 */

module.exports.getClient = function *(clientId, clientSecret) {
	return models.OAuthClient.findOne({
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
			id: result.id,
			clientId: result.clientId,
			clientSecret: result.clientSecret,
			redirectUris: [],
			grants: ['password'] // the list of OAuth2 grant types that should be allowed
		};
	});
};

/*
 * Get user.
 */

module.exports.getUser = function(email, password) {
	var isValidPassword = function(userpass, password) {
	 return bCrypt.compareSync(password, userpass);
	}
	return models.User.findOne({
		where: {
			email: email
		}
	}).then(function(user){
		if(!user){
			return false
		}

		if(!isValidPassword(user.password, password)) {
			return false
		}

		return user.get();
	}).catch(function(err){
		console.log("Error:", err);        
	});;
};

module.exports.saveToken = function(token, client, user){
	return models.OAuthToken.create({
    access_token: token.accessToken,
    access_token_expires_on: token.accessTokenExpiresAt,
    refresh_token: token.refreshToken,
    refresh_token_expires_on: token.refreshTokenExpiresAt,
    client_id: client.id,
    user_id: user.id,
    scope: token.scope
  }).then(function(result){

  	return _.assign(  // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          access_token: token.accessToken, // proxy
          refresh_token: token.refreshToken, // proxy
        },
        token
      )
  })
}

module.exports.getRefreshToken = function *(refreshToken){
	return models.OAuthToken.findOne({
		where: {
			refresh_token: refreshToken
		}
	}).then(function(result){
		if(!result){
			return false
		}

		console.log(result);
		return {
			refreshToken: result.refresh_token,
			client: {
				id: result.client_id
			},
			user: result.user
		}
	})
}