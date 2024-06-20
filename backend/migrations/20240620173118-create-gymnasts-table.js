import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Gymnasts', {
    gymnast_id: {
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
    date_of_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    club: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    district: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    contact_number: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    ethnicity: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    group_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'GymnastGroups',
        key: 'group_id',
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
  await queryInterface.dropTable('Gymnasts');
};
