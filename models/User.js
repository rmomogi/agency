'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    last_login: DataTypes.DATE,
    status: DataTypes.ENUM('active', 'inactive') 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return User;
};