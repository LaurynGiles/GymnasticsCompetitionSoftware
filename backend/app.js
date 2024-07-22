import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/db.js';
import db from './models/index.js';
import session from 'express-session';
import passport from 'passport';
import crypto from 'crypto';
import './auth.js';
// import cookieParser from 'cookie-parser';

import gymnastRoutes from './routes/gymnastRoutes.js';
import competitionRoutes from './routes/competitionRoutes.js';
import difficultyRoutes from './routes/difficultyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import executionRoutes from './routes/executionRoutes.js';
import gymnastGroupRoutes from './routes/gymnastGroupRoutes.js';
import judgeRoutes from './routes/judgeRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import timeslotRoutes from './routes/timeslotRoutes.js'
import apparatusRoutes from './routes/apparatusRoutes.js';
import authRoutes from './routes/authRoutes.js';
import completeRoutes from './routes/completeRoutes.js';

const app = express();
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
];

//Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

// Setup session management
app.use(session({
    secret: secret, // Replace with your own secret
    resave: false, // False: Session not saved back to session store if not modified during request
    saveUninitialized: false, //False: Session not created until something is stored in it
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/apparatuses', apparatusRoutes);
app.use('/api/complete', completeRoutes);
app.use('/api', authRoutes);

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