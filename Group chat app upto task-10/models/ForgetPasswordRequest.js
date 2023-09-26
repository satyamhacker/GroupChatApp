// models/ForgetPasswordRequest.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ForgetPasswordRequest = sequelize.define('ForgetPasswordRequest', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, {
  tableName: 'forgetpasswordrequests', // Specify the correct table name
});

module.exports = ForgetPasswordRequest;
