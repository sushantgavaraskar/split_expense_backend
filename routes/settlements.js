const express = require('express');
const router = express.Router();
const settlementController = require('../controllers/settlementController');

router.get('/people', settlementController.getPeople);
router.get('/balances', settlementController.getBalances);
router.get('/settlements', settlementController.getSettlementSummary);

module.exports = router;
