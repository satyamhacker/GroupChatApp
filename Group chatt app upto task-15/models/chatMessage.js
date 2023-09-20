const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./User');

const ChatMessage = sequelize.define('ChatMessage', {
  messages: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loginuserid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'chatmessages', // Specify the correct lowercase table name
});

// Define the correct foreign key associations
ChatMessage.belongsTo(User, { foreignKey: 'loginuserid', onDelete: 'CASCADE' });
User.hasMany(ChatMessage, { foreignKey: 'loginuserid', onDelete: 'CASCADE' });

sequelize.sync()
  .then(() => {
   // console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });

module.exports = ChatMessage;
