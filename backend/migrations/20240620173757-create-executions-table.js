import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Executions', {
    event_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'event_id',
      },
      primaryKey: true,
    },
    gymnast_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Gymnasts',
        key: 'gymnast_id',
      },
      primaryKey: true,
    },
    judge_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Judges',
        key: 'judge_id',
      },
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
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('Executions');
};