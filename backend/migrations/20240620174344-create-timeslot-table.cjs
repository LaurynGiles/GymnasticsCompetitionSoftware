'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('TimeSlot', {
      time_slot_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      competition_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Competition',
          key: 'competition_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Automatically delete TimeSlot if the associated Competition is deleted
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      report_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      competition_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      award_time: {
        type: Sequelize.TIME,
        allowNull: false,
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
    await queryInterface.dropTable('TimeSlot');
  },
};