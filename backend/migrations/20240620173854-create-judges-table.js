import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Judges', {
    judge_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gsa_id: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    club: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
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
  await queryInterface.dropTable('Judges');
};