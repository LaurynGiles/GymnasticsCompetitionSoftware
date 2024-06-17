const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Apparatus = sequelize.define('Apparatus', {
  apparatus_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  apparatus_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Apparatus;