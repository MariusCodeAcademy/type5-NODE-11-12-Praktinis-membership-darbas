/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const membershipsRoutes = require('./routes/membershipRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(morgan('dev'));
// kad galetume gauti duomenis json formatu
app.use(express.json());

// Routes
app.use('/', membershipsRoutes);
// Launch app
app.listen(PORT, console.log(`server online on port ${PORT}`));
