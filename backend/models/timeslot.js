const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TimeSlot = sequelize.define('TimeSlot', {
  time_slot_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  report_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  competition_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  award_time: {
    type: DataTypes.TIME,
    allowNull: false
  }
});

module.exports = TimeSlot;