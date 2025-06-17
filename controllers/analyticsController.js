const Expense = require('../models/Expense');
const { successResponse, errorResponse } = require('../middleware/responseFormatter');
const moment = require('moment');

const round = (num) => parseFloat(num.toFixed(2));

exports.getMonthlySummary = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    const summary = {};

    expenses.forEach(exp => {
      const month = moment(exp.createdAt).format('YYYY-MM');
      if (!summary[month]) summary[month] = { total: 0, byPerson: {}, byCategory: {} };

      summary[month].total = round(summary[month].total + exp.amount);

      if (!summary[month].byPerson[exp.paid_by])
        summary[month].byPerson[exp.paid_by] = 0;
      summary[month].byPerson[exp.paid_by] = round(
        summary[month].byPerson[exp.paid_by] + exp.amount
      );

      if (!summary[month].byCategory[exp.category])
        summary[month].byCategory[exp.category] = 0;
      summary[month].byCategory[exp.category] = round(
        summary[month].byCategory[exp.category] + exp.amount
      );
    });

    return successResponse(res, summary, "Monthly summary generated");
  } catch (err) {
    next(err);
  }
};

exports.getCategorySummary = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    const summary = {};

    expenses.forEach(exp => {
      if (!summary[exp.category]) summary[exp.category] = 0;
      summary[exp.category] = round(summary[exp.category] + exp.amount);
    });

    return successResponse(res, summary, "Category summary generated");
  } catch (err) {
    next(err);
  }
};
