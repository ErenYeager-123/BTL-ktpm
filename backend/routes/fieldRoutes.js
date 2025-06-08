const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Kiểm tra xem controller có được import đúng không
console.log('fieldController:', fieldController);

router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getFieldById);
router.post('/', authenticateToken, authorizeAdmin, fieldController.createField);
router.put('/:id', authenticateToken, authorizeAdmin, fieldController.updateField);
router.delete('/:id', authenticateToken, authorizeAdmin, fieldController.deleteField);
router.get('/public', fieldController.getAllFieldsPublic);
router.get('/public/:id', fieldController.getFieldByIdPublic);

module.exports = router;