const Expense = require('../models/Expense');
const { successResponse, errorResponse } = require('../middleware/responseFormatter');

// Normalize helper
const normalize = (name) => name.trim().toLowerCase();

exports.addExpense = async (req, res, next) => {
  try {
    let {
      amount,
      description,
      paid_by,
      participants,
      split_type,
      split_values,
      category,
      
    } = req.body;

    paid_by = normalize(paid_by);
    participants = participants.map(normalize);

    const expense = new Expense({
      amount,
      description,
      paid_by,
      participants,
      split_type,
      split_values,
      category,
      
    });

    await expense.save();
    return successResponse(res, expense, "Expense added successfully", 201);
  } catch (error) {
    next(error);
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    return successResponse(res, expenses, "Expenses retrieved successfully");
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const updateData = {};
    const fields = [
      "amount", "description", "split_type", "split_values",
      "category", "is_recurring", "recurrence"
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    if (req.body.paid_by) {
      updateData.paid_by = normalize(req.body.paid_by);
    }

    if (req.body.participants) {
      updateData.participants = req.body.participants.map(normalize);
    }

    const expense = await Expense.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!expense) {
      return errorResponse(res, "Expense not found", 404);
    }

    return successResponse(res, expense, "Expense updated successfully");
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return errorResponse(res, "Expense not found", 404);

    return successResponse(res, {}, "Expense deleted successfully");
  } catch (error) {
    next(error);
  }
};
