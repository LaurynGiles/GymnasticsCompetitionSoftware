const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const GymnastGroup = require('./gymnastGroup');

const Gymnast = sequelize.define('Gymnast', {
  gymnast_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  gsa_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  club: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ethnicity: {
    type: DataTypes.STRING,
    allowNull: true
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'GymnastGroup',
      key: 'group_id'
    }
  }
});

Gymnast.belongsTo(GymnastGroup, {
  foreignKey: 'group_id'
});

module.exports = Gymnast;