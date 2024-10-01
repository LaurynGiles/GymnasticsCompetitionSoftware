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
      group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GymnastGroup',
          key: 'group_id',
        },
        onDelete: 'CASCADE', // Automatically delete events if the associated GymnastGroup is deleted
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      apparatus_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Apparatus',
          key: 'apparatus_id',
        },
        onDelete: 'SET NULL', // Set apparatus_id to NULL if the associated Apparatus is deleted
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
      fields: ['group_id', 'apparatus_id'],
      type: 'unique',
      name: 'unique_group_apparatus_combination',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Event');
  },
};