const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Event = require('./Event');
const Gymnast = require('./Gymnast');
const Judge = require('./Judge');

const Execution = sequelize.define('Execution', {
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Event,
      key: 'event_id'
    }
  },
  gymnast_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Gymnast,
      key: 'gymnast_id'
    }
  },
  judge_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Judge,
      key: 'judge_id'
    }
  },
  execution_score: {
    type: DataTypes.REAL,
    allowNull: false
  }
});

module.exports = Execution;