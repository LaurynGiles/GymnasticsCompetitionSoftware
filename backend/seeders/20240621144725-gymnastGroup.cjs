'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GymnastGroup', [
      {
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GymnastGroup', null, {});
  }
};