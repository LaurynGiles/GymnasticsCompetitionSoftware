'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Session', [
      {
        competition_id: 1,
        level: '1',
        age: '12-14',
        time_slot_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 2,
        level: '2',
        age: '15-17',
        time_slot_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Session', null, {});
  }
};