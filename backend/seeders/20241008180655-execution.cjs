'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Execution', [
      {
        event_id: 1,
        gymnast_id: 1,
        judge_id: 1,
        execution_score: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 1,
        gymnast_id: 1,
        judge_id: 2,
        execution_score: 9.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 1,
        gymnast_id: 1,
        judge_id: 3,
        execution_score: 8.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 1,
        gymnast_id: 1,
        judge_id: 4,
        execution_score: 8.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        gymnast_id: 1,
        judge_id: 1,
        execution_score: 8.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        gymnast_id: 1,
        judge_id: 2,
        execution_score: 7.7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        gymnast_id: 1,
        judge_id: 3,
        execution_score: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        event_id: 2,
        gymnast_id: 1,
        judge_id: 4,
        execution_score: 7.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Difficulty', null, {});
  }
};