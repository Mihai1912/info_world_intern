const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Car = require('./Car');

const UserCar = sequelize.define('UserCar', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  carId: {
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
    allowNull: false,
  },
});

User.belongsToMany(Car, { through: UserCar, foreignKey: 'userId' });
Car.belongsToMany(User, { through: UserCar, foreignKey: 'carId' });

module.exports = UserCar;