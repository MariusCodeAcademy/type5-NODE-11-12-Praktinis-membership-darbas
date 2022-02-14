const express = require('express');

const router = express.Router();
const membershipsController = require('../controllers/membershipsController');

router.get('/memberships', membershipsController.membershipsIndex);
router.post('/memberships', membershipsController.createMembership);

module.exports = router;
