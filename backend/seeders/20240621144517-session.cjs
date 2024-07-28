'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Session', [
      {
        time_slot_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time_slot_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time_slot_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time_slot_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        time_slot_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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