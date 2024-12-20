'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Qualification', [
      {
        competition_id: 1,
        name: "National Championships",
        min_score: 20.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 2,
        name: "Provincial Championships",
        min_score: 15.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Qualification', null, {});
  }
};