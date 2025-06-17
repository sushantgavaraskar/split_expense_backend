const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validateRequest = require('../middleware/validateRequest');
const expenseSchema = require('../validators/expenseSchema');
const validateObjectId = require('../middleware/validateObjectId');

router.post('/', validateRequest(expenseSchema), expenseController.addExpense);
router.get('/', expenseController.getAllExpenses);
router.put('/:id',validateObjectId, validateRequest(expenseSchema), expenseController.updateExpense);
router.delete('/:id', validateObjectId ,expenseController.deleteExpense);
router.post('/test', (req, res) => {
    res.json({ message: "Test POST is working!" });
  });

module.exports = router;
