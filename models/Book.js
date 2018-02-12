'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    publishing_company: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Book.hasMany(models.Loan)
      }
    }
  });

  Book.associate = function(models){
    Book.belongsTo(models.Genre, {foreignKey: 'genre_id'})
  }
  return Book;
};