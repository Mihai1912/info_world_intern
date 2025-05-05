const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    appointment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_appointment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    appointment_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Appointment;