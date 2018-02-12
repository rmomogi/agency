const Sequelize = require('sequelize');
const path = require('path');

var config = require('./configuration');
var models = require(path.join(__dirname, '..', 'models'));

var { database: { host, port, name } } = config;

const sequelize = new Sequelize(`${name}`, null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite')
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

// models.sequelize.sync().then(function () {
//   server.listen(port);
//   server.on('error', onError);
//   server.on('listening', onListening);
// });

module.exports = sequelize;