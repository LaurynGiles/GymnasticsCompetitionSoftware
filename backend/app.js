const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const judgeRoutes = require('./routes/judgeRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use('/api/judges', judgeRoutes);

module.exports = app;