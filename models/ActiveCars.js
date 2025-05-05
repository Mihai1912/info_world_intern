const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Car = require('./Car');

const ActiveCar = sequelize.define('ActiveCar', {
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ActiveCar;