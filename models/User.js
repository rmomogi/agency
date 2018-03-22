'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'O nome do usuário é obrigatório!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'O e-mail usuário é obrigatório!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'O contato do usuário é obrigatório!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A senha do usuário é obrigatório!'
        }
      }
    },
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