const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Gymnast = require('./gymnast');

const GymnastGroup = sequelize.define('GymnastGroup', {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Session',
        key: 'session_id'
      }
    }
});


GymnastGroup.hasMany(Gymnast, {
  foreignKey: 'group_id'
});
  
module.exports = GymnastGroup;