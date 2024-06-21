'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GymnastGroup', [
      {
        session_id: 1, // Assuming the session_id 1 exists
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        session_id: 2, // Assuming the session_id 2 exists
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GymnastGroup', null, {});
  }
};