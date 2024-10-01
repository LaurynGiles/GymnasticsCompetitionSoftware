'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Execution', {
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Event',
          key: 'event_id',
        },
        onDelete: 'CASCADE', // Delete execution scores if the event is deleted
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      gymnast_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Gymnast',
          key: 'gymnast_id',
        },
        onDelete: 'CASCADE', // Delete execution scores if the gymnast is deleted
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      judge_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Judge',
          key: 'judge_id',
        },
        onDelete: 'SET NULL', // Set judge_id to NULL if the judge is deleted
        onUpdate: 'CASCADE',
        primaryKey: true,
      },
      execution_score: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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
    await queryInterface.dropTable('Execution');
  },
};