'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Judge', [
      {
        gsa_id: 'J123456',
        first_name: 'John',
        last_name: 'Doe',
        club: 'Gymnastics Club A',
        level: '1',
        head_judge: false,
        role: 'E',
        gender: 'Male',
        contact_number: '123-456-7890',
        email: 'john.doe@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: 'J789012',
        first_name: 'Jane',
        last_name: 'Smith',
        club: 'Gymnastics Club B',
        level: '2',
        head_judge: true,
        role: 'D',
        gender: 'Female',
        contact_number: '098-765-4321',
        email: 'jane.smith@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: 'J345678',
        first_name: 'Emily',
        last_name: 'Brown',
        club: 'Gymnastics Club C',
        level: '3',
        head_judge: false,
        role: 'E',
        gender: 'Female',
        contact_number: '555-555-5555',
        email: 'emily.brown@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: 'J901234',
        first_name: 'Michael',
        last_name: 'Johnson',
        club: 'Gymnastics Club D',
        level: '1',
        head_judge: true,
        role: 'D',
        gender: 'Male',
        contact_number: '666-666-6666',
        email: 'michael.johnson@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: 'J567890',
        first_name: 'Sarah',
        last_name: 'Williams',
        club: 'Gymnastics Club E',
        level: '2',
        head_judge: false,
        role: 'E',
        gender: 'Female',
        contact_number: '777-777-7777',
        email: 'sarah.williams@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Judge', null, {});
  }
};