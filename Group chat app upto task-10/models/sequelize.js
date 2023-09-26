const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupchatapp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
