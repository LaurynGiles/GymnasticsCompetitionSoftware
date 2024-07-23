'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Apparatus', [
      {
        apparatus_name: 'Vault',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'Floor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'Parallel bars',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apparatus_name: 'High bar',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Apparatus', null, {});
  }
};