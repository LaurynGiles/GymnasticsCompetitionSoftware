import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('TimeSlots', {
    time_slot_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  await queryInterface.dropTable('TimeSlots');
};