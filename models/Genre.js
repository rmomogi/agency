'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
    title: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Genre.hasMany(models.Book)
      }
    }
  });
  return Genre;
};