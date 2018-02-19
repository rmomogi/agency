'use strict';
module.exports = (sequelize, DataTypes) => {
  var OAuthToken = sequelize.define('OAuthToken', {
    accessToken: DataTypes.STRING,
    expires: DataTypes.DATE,
    client_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  OAuthToken.associate = function(models){
    OAuthToken.belongsTo(models.User, {foreignKey: 'user_id'})
  }
  return OAuthToken;
};