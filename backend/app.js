import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/db.js';
import db from './models/index.js';
import session from 'express-session';
import passport from 'passport';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import './auth.js';

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
    'http://localhost:5175',
];

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

function logModelDetails() {
  Object.values(db).forEach(model => {
    if (model.name && model.name != "Sequelize") {
      console.log(`Model: ${model.name}`);
      console.log(`Attributes: ${Object.keys(model.rawAttributes).join(', ')}`);
      if (model.associations) {
        console.log('Associations:');
        Object.values(model.associations).forEach(association => {
          console.log(`  ${association.associationType} -> ${association.target.name}`);
        });
      }
      console.log('---');
    }
  });
}

async function seedDatabase() {
    try {
        
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        console.log(__dirname);
        const seedersPath = path.join(__dirname, '/seeders/');
        console.log(seedersPath);

        const files = await fs.readdir(seedersPath);

        for (const file of files) {
          if (file.endsWith('.cjs')) {
            const { up } = await import(path.join(seedersPath, file));
            await up(db.sequelize.getQueryInterface(), db.Sequelize);
          }
        }

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

if (process.env.NODE_ENV === 'development') {
  console.log("SYNCING DB");
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Database synced');
      seedDatabase();
    }).catch(err => {
      console.error('Error syncing database:', err);
    });
}

console.log(sequelize);
logModelDetails();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// sequelize.close()

export default app;