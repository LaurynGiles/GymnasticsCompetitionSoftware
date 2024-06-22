import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import gymnastRoutes from './routes/gymnastRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js'
import sequelize from './config/db.js';
import db from './models/index.js';

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api/gymnasts', gymnastRoutes);
app.use('/api/competitions', competitionRoutes);

// function logModelDetails() {
//   Object.values(db).forEach(model => {
//     if (model.name) {
//       console.log(`Model: ${model.name}`);
//       console.log(`Attributes: ${Object.keys(model.rawAttributes).join(', ')}`);
//       if (model.associations) {
//         console.log('Associations:');
//         Object.values(model.associations).forEach(association => {
//           console.log(`  ${association.associationType} -> ${association.target.name}`);
//         });
//       }
//       console.log('---');
//     }
//   });
// }

// sequelize.sync({ force: false }) // set to true if you want tables to be dropped before recreation
//   .then(() => {
//     console.log('Database synced');
//   }).catch(err => {
//     console.error('Error syncing database:', err);
//   });

console.log(sequelize);
// logModelDetails();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;