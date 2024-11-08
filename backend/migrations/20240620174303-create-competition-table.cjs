'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Competition', {
      competition_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Admin',
          key: 'admin_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      competition_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      style: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bronze_min_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      bronze_max_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      silver_min_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      silver_max_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      gold_min_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
      },
      gold_max_score: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: true,
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
    await queryInterface.dropTable('Competition');
  },
};