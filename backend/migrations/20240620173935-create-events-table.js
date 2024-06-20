import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Events', {
    event_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Sessions',
        key: 'session_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    apparatus_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Apparatus',
        key: 'apparatus_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
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
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('Events');
};