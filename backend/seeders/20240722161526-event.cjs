'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Event', [
      {
        session_id: 1,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 1,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 1,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 1,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Event', null, {});
  }
};