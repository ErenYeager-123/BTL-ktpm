const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticateToken } = require('../middleware/auth');

router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.get('/bookings', authenticateToken, customerController.getBookings);

module.exports = router;