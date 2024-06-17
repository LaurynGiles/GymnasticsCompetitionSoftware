const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Event = require('./Event');
const Gymnast = require('./Gymnast');
const Judge = require('./Judge');

const Difficulty = sequelize.define('Difficulty', {
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
  difficulty_score: {
    type: DataTypes.REAL,
    allowNull: false
  },
  penalty_score: {
    type: DataTypes.REAL,
    allowNull: false
  },
  start_score: {
    type: DataTypes.REAL,
    allowNull: false
  }
});

module.exports = Difficulty;