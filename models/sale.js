'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sale = sequelize.define('Sale', {
    number: DataTypes.STRING,
    status: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    payment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Sale.associate = function(models){
    Sale.belongsTo(models.User, {foreignKey: 'user_id'})
  }

  Sale.prototype.total = function(){
    return 99.05
  }

  return Sale;
};