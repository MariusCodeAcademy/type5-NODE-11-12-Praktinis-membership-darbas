const express = require('express');

const membershipsRoutes = express.Router();
const membershipsController = require('../controllers/membershipsController');

membershipsRoutes.get('/memberships', membershipsController.membershipsIndex);
membershipsRoutes.post('/memberships', membershipsController.createMembership);

module.exports = membershipsRoutes;
