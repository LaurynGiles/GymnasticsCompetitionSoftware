'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Event', [
      {
        group_id: 1,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 1,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 1,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 1,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 2,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 2,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 2,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 2,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 3,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 3,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 3,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 3,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 4,
        apparatus_id: 1,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 4,
        apparatus_id: 2,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 4,
        apparatus_id: 3,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 4,
        apparatus_id: 4,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 6,
        apparatus_id: 5,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 6,
        apparatus_id: 6,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 7,
        apparatus_id: 7,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        group_id: 7,
        apparatus_id: 8,
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