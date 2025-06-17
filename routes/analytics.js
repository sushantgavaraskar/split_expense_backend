const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/monthly-summary', analyticsController.getMonthlySummary);
router.get('/category-summary', analyticsController.getCategorySummary);

module.exports = router;
