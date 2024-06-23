import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import gymnastRoutes from './routes/gymnastRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import difficultyRoutes from './routes/difficultyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import executionRoutes from './routes/executionRoutes.js';
import gymnastGroupRoutes from './routes/gymnastGroupRoutes.js';
import judgeRoutes from './routes/judgeRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import timeslotRoutes from './routes/timeslotRoutes.js'
import sequelize from './config/db.js';
import db from './models/index.js';

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api/gymnasts', gymnastRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/difficulties', difficultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/gymnastgroups', gymnastGroupRoutes);
app.use('/api/judges', judgeRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/timeslots', timeslotRoutes);

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