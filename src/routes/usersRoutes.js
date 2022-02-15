const express = require('express');

const usersRoutes = express.Router();
const usersController = require('../controllers/usersController');

usersRoutes.post('/users', usersController.createUser);
usersRoutes.get('/users/:order?', usersController.usersIndex);

module.exports = usersRoutes;
