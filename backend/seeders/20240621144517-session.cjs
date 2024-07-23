'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Session', [
      {
        level: '1',
        age: '7-8',
        time_slot_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level: '2',
        age: '10-12',
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