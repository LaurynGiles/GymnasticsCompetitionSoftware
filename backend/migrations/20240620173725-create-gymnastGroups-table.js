import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('GymnastGroups', {
    group_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Sessions',
        key: 'session_id',
      },
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
  await queryInterface.dropTable('GymnastGroups');
};