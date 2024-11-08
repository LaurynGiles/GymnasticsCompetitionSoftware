'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Apparatus', [
      {
        apparatus_name: 'Vault',
        competition_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'Floor',
        competition_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'Parallel bars',
        competition_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'High bar',
        competition_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Apparatus', null, {});
  }
};