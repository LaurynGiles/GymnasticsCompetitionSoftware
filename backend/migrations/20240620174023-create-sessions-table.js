import { Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.createTable('Sessions', {
    session_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    session_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    session_name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    competition_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Competitions',
        key: 'competition_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    time_slot_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'TimeSlots',
        key: 'time_slot_id',
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
  await queryInterface.dropTable('Sessions');
};