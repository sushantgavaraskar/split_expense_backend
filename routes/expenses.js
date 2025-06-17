const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const validateRequest = require('../middleware/validateRequest');
const expenseSchema = require('../validators/expenseSchema');

router.post('/', validateRequest(expenseSchema), expenseController.addExpense);
router.get('/', expenseController.getAllExpenses);
router.put('/:id', validateRequest(expenseSchema), expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);
router.post('/test', (req, res) => {
    res.json({ message: "Test POST is working!" });
  });

module.exports = router;
