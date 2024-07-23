'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Session', {
      session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      level: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      time_slot_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TimeSlot',
          key: 'time_slot_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Session');
  },
};