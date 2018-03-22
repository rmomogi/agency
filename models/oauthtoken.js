'use strict';
module.exports = (sequelize, DataTypes) => {
  var OAuthToken = sequelize.define('OAuthToken', {
    access_token: DataTypes.STRING,
    access_token_expires_on: DataTypes.DATE,
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    refresh_token: DataTypes.STRING,
    scope: DataTypes.STRING,
    refresh_token_expires_on: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  OAuthToken.associate = function(models){
    OAuthToken.belongsTo(models.User, {foreignKey: 'user_id'})
    OAuthToken.belongsTo(models.OAuthClient, {foreignKey: 'client_id'})
  }
  return OAuthToken;
};