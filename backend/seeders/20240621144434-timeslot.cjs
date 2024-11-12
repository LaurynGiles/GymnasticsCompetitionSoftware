'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TimeSlot', [
      {
        competition_id: 1,
        date: '2024-03-01',
        report_time: '08:00:00',
        competition_time: '09:00:00',
        award_time: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        date: '2024-03-02',
        report_time: '10:00:00',
        competition_time: '11:00:00',
        award_time: '14:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 2,
        date: '2024-03-01',
        report_time: '08:00:00',
        competition_time: '09:00:00',
        award_time: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 2,
        date: '2024-03-02',
        report_time: '10:00:00',
        competition_time: '11:00:00',
        award_time: '14:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TimeSlot', null, {});
  }
};