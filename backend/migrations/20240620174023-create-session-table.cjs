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
      time_slot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TimeSlot',
          key: 'time_slot_id',
        },
        onDelete: 'CASCADE', // Automatically delete Session entries if the TimeSlot is deleted
        onUpdate: 'CASCADE',
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