const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Car = sequelize.define('Car', {
  registration_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  chassis_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manufacture_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  engine_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  engine_capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  horsepower: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  kw_power: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

module.exports = Car;
