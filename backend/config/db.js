const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING === 'true',
});

module.exports = sequelize;

// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: process.env.DB_DIALECT,
//   storage: process.env.DB_STORAGE,
//   logging: process.env.DB_LOGGING === 'true',
// });

// const initializeDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     await sequelize.sync();
//     console.log('Database synced successfully.');

//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1);
//   }
// };

// initializeDatabase();
  
// module.exports = {
//   sequelize,
//   initializeDatabase,
// };