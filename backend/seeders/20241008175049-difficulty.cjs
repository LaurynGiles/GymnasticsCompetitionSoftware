'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Difficulty', [
      {
        event_id: 1,
        gymnast_id: 1,
        judge_id: 1,
        difficulty_score: 8.5,
        penalty_score: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        gymnast_id: 1,
        judge_id: 1,
        difficulty_score: 8.5,
        penalty_score: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 3,
        gymnast_id: 1,
        judge_id: 1,
        difficulty_score: 8.5,
        penalty_score: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 4,
        gymnast_id: 1,
        judge_id: 1,
        difficulty_score: 8.5,
        penalty_score: 0.3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Difficulty', null, {});
  }
};