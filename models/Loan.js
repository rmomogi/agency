'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    initDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Loan.associate = function(models){
    Loan.belongsTo(models.Book, {foreignKey: 'book_id'})
    Loan.belongsTo(models.User, {foreignKey: 'user_id'})
  }
  return Loan;
};