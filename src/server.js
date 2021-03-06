/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const membershipsRoutes = require('./routes/membershipRoutes');
const usersRoutes = require('./routes/usersRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(morgan('dev'));
// kad galetume gauti duomenis json formatu
app.use(express.json());
app.use(cors());

// Routes
app.use('/', membershipsRoutes);
app.use('/', usersRoutes);

// Launch app
app.listen(PORT, console.log(`server online on port ${PORT}`));
