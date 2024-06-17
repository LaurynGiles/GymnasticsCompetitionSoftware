const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Competition = require('./Competition');
const TimeSlot = require('./TimeSlot');

const Session = sequelize.define('Session', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  competition_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Competition,
      key: 'competition_id'
    }
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  time_slot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TimeSlot,
      key: 'time_slot_id'
    }
  }
});

module.exports = Session;