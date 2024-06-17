const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Session = require('./Session');
const Apparatus = require('./Apparatus');

const Event = sequelize.define('Event', {
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Session,
      key: 'session_id'
    }
  },
  apparatus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Apparatus,
      key: 'apparatus_id'
    }
  }
});

module.exports = Event;