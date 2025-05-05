const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const ActiveUser = sequelize.define('ActiveUser', {
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = ActiveUser; 