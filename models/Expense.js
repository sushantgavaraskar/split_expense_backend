const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be positive"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  paid_by: {
    type: String,
    required: [true, "Paid By is required"]
  },
  participants: {
    type: [String],
    required: [true, "At least one participant is required"]
  },
  split_type: {
    type: String,
    enum: ['equal', 'percentage', 'exact'],
    default: 'equal'
  },
  split_values: {
    type: [Number],
    default: []
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Utilities', 'Entertainment', 'Other'],
    default: 'Other'
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
