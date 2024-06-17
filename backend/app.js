const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const judgeRoutes = require('./routes/judgeRoutes');
const { sequelize } = require('./config/db');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/judges', judgeRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;