'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admin', [
      {
        username: 'admin',
        password: '1234',
        first_name: 'Lauryn',
        last_name: 'Giles',
        contact_number: '021-548-5684',
        email: 'lauryn.g@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};