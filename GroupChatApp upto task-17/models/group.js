const Sequelize = require('sequelize')

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./User');

const usergroup = sequelize.define('usergroup', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
    },
    username:{
        type: DataTypes.CHAR,
        allowNull: false

    },
    groupname:{
        type: DataTypes.STRING,
        allowNull: false
    },

    groupowner:{
        type: DataTypes.STRING,
        allowNull: false
    },
    message:{
        type:DataTypes.CHAR,

    },
    isGroupAdmin: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    }
  },{
    tableName: 'group_related'  // Specify the correct lowercase table name
});
  
sequelize.sync()
.then(() => {
    //console.log('Models synchronized with the database');
})
.catch((error) => {
    console.error('Error synchronizing models:', error);
});



module.exports = usergroup;