var models  = require('../models');

module.exports.getAccessToken = function(bearerToken){

	return models.OAuthToken.findOne({
		where: {
			access_token: bearerToken
		}
	}).
	then(function(result){
		return {
			accessToken: result.access_token,
			client: { id: result.client_id },
			expires: result.expires,
			user: { id: result.user_id }
		}
	})
}

module.exports.getClient = function *(clientId, clientSecret){

	return models.OAuthClient.findOne({
		where:{
			client_id: clientId,
			client_secret: clientSecret
		}
	}).
	then(function(result){
		if(!result){
			return;
		}

		return {
			clientId: result.client_id,
			clientSecret: result.client_secret,
			grants: ['password']
		}
	});
}

module.exports.getRefreshToken  = function*(bearerToken){

	return models.OAuthToken.findOne({
		where:{
			refresh_token: bearerToken
		}
	}).
	then(function(result){
		return result.rowCount ? result : false;
	})
}

module.exports.getUser = function *(email, password){

	return models.User.findOne({
		where: {
			email: email			
		}
	}).
	then(function(result){		
		if(!result){
			return false;
		} 

		if (!bCrypt.compareSync(password, userpass)){
			return false;
		}
		return result;
	})
}

module.exports.saveAccessToken = function *(token, client, user){
	models.OAuthToken.create({
		access_token: token.accessToken,
		access_token_expires_on: token.accessTokenExpiresOn,
		client_id: client.id,
		refresh_token: token.refreshToken,
		refresh_token_expires_on: token.refreshTokenExpiresOn,
		user_id: user.id
	}).
	then(function(result){
		return result.rowCount ? result : false;
	})
}

module.exports.getUserFromClient = function(){
	
}