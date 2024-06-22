import app from '../app.js';
// import sequelize from '../config/db.js';
// import { seedDatabase } from './seedData.js';

before(async () => {
//   try {
//     await sequelize.sync({ force: true });
//     await seedDatabase(); // Seed the database if needed
//     console.log('Database synced and seeded successfully');
//   } catch (error) {
//     console.error('Error syncing and seeding database:', error);
//   }
});

export default app;