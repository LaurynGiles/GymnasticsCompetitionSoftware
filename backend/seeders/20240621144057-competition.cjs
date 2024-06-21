'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Competition', [
      {
        competition_name: 'Spring Invitational',
        start_date: '2024-03-01',
        end_date: '2024-03-03',
        location: 'Springfield',
        style: 'MAG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_name: 'Summer Championships',
        start_date: '2024-06-15',
        end_date: '2024-06-17',
        location: 'Sunville',
        style: 'WAG',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Competition', null, {});
  }
};