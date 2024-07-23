'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gymnast', [
      {
        gsa_id: '455613',
        first_name: 'Alice',
        last_name: 'Smith',
        date_of_birth: '2008-03-22',
        club: 'Gym Club A',
        district: 'District A',
        contact_number: '123-456-7890',
        ethnicity: 'Caucasian',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '897654',
        first_name: 'Bob',
        last_name: 'Johnson',
        date_of_birth: '2009-06-15',
        club: 'Gym Club B',
        district: 'District B',
        contact_number: '234-567-8901',
        ethnicity: 'Black',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '742313',
        first_name: 'Charlie',
        last_name: 'Williams',
        date_of_birth: '2010-08-30',
        club: 'Gym Club C',
        district: 'District C',
        contact_number: '345-678-9012',
        ethnicity: 'Caucasian',
        group_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '354344',
        first_name: 'Diana',
        last_name: 'Brown',
        date_of_birth: '2007-12-10',
        club: 'Gym Club A',
        district: 'District A',
        contact_number: '456-789-0123',
        ethnicity: 'Black',
        group_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '456846',
        first_name: 'Ethan',
        last_name: 'Jones',
        date_of_birth: '2009-07-25',
        club: 'Gym Club B',
        district: 'District B',
        contact_number: '567-890-1234',
        ethnicity: 'Caucasian',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '549879',
        first_name: 'Fiona',
        last_name: 'Garcia',
        date_of_birth: '2011-09-18',
        club: 'Gym Club C',
        district: 'District C',
        contact_number: '678-901-2345',
        ethnicity: 'Caucasian',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '465431',
        first_name: 'George',
        last_name: 'Martinez',
        date_of_birth: '2008-11-05',
        club: 'Gym Club A',
        district: 'District A',
        contact_number: '789-012-3456',
        ethnicity: 'Black',
        group_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '135497',
        first_name: 'Hannah',
        last_name: 'Hernandez',
        date_of_birth: '2010-04-12',
        club: 'Gym Club B',
        district: 'District B',
        contact_number: '890-123-4567',
        ethnicity: 'Black',
        group_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '768454',
        first_name: 'Ian',
        last_name: 'Lee',
        date_of_birth: '2009-01-20',
        club: 'Gym Club C',
        district: 'District C',
        contact_number: '901-234-5678',
        ethnicity: 'Caucasian',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gsa_id: '786613',
        first_name: 'Jane',
        last_name: 'Perez',
        date_of_birth: '2011-05-27',
        club: 'Gym Club A',
        district: 'District A',
        contact_number: '012-345-6789',
        ethnicity: 'Black',
        group_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Gymnast', null, {});
  }
};