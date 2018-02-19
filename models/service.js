'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var Service = sequelize.define('Service', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'O nome do serviço é obrigatório!'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'A descrição do serviço é obrigatório!'  
        }        
      }
    },
    price: {
      type: DataTypes.DECIMAL
    },
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Service;
};