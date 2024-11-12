'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Judge', [
      {
        competition_id: 1,
        gsa_id: '123456',
        first_name: 'John',
        last_name: 'Deer',
        club: 'Gymnastics Club A',
        level: '1',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '789012',
        first_name: 'Jane',
        last_name: 'Smith',
        club: 'Gymnastics Club B',
        level: '2',
        head_judge: true,
        role: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '345678',
        first_name: 'Emily',
        last_name: 'Brown',
        club: 'Gymnastics Club C',
        level: '3',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 2,
        gsa_id: '901234',
        first_name: 'Michael',
        last_name: 'Johnson',
        club: 'Gymnastics Club D',
        level: '1',
        head_judge: true,
        role: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '567890',
        first_name: 'Sarah',
        last_name: 'Williams',
        club: 'Gymnastics Club E',
        level: '2',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '234567',
        first_name: 'Alex',
        last_name: 'Turner',
        club: 'Gymnastics Club F',
        level: '3',
        head_judge: true,
        role: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '345789',
        first_name: 'Linda',
        last_name: 'Martin',
        club: 'Gymnastics Club G',
        level: '2',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '456890',
        first_name: 'David',
        last_name: 'Clark',
        club: 'Gymnastics Club H',
        level: '3',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '567901',
        first_name: 'Megan',
        last_name: 'Scott',
        club: 'Gymnastics Club I',
        level: '1',
        head_judge: false,
        role: 'E',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        competition_id: 1,
        gsa_id: '678012',
        first_name: 'Chris',
        last_name: 'Taylor',
        club: 'Gymnastics Club J',
        level: '2',
        head_judge: true,
        role: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Judge', null, {});
  }
};