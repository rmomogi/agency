'use strict';
module.exports = (sequelize, DataTypes) => {
  var SaleItem = sequelize.define('SaleItem', {
    sale_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SaleItem;
};