'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Event', {
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Session',
          key: 'session_id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      apparatus_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Apparatus',
          key: 'apparatus_id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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

    await queryInterface.addConstraint('Event', {
      fields: ['session_id', 'apparatus_id'],
      type: 'unique',
      name: 'unique_session_apparatus_combination',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Event');
  },
};
