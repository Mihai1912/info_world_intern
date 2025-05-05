const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CarProblems = sequelize.define('CarProblems', {
    problem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    problem_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    });

module.exports = CarProblems;