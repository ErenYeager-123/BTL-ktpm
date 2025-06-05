const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, paymentController.createPayment);
router.get('/', authenticateToken, paymentController.getPayments);

module.exports = router;