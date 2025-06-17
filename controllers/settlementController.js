const Expense = require('../models/Expense');
const { successResponse, errorResponse } = require('../middleware/responseFormatter');

const normalize = (name) => name.trim().toLowerCase();
const round = (num) => parseFloat(num.toFixed(2));

exports.getPeople = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    const peopleSet = new Set();

    expenses.forEach(exp => {
      peopleSet.add(normalize(exp.paid_by));
      exp.participants.forEach(p => peopleSet.add(normalize(p)));
    });

    return successResponse(res, Array.from(peopleSet), "People fetched successfully");
  } catch (error) {
    next(error);
  }
};

exports.getBalances = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    const balances = {};

    expenses.forEach(exp => {
      const total = exp.amount;
      const { paid_by, participants, split_type, split_values } = exp;

      const payer = normalize(paid_by);
      const part = participants.map(normalize);

      if (part.length === 0) return;

      [payer, ...part].forEach(p => {
        if (!balances[p]) balances[p] = 0;
      });

      balances[payer] = round(balances[payer] + total);

      if (split_type === 'equal') {
        const share = total / part.length;
        part.forEach(p => {
          balances[p] = round(balances[p] - share);
        });
      } else if (split_type === 'percentage') {
        part.forEach((p, i) => {
          const deduction = (split_values[i] / 100) * total;
          balances[p] = round(balances[p] - deduction);
        });
      } else if (split_type === 'exact') {
        part.forEach((p, i) => {
          balances[p] = round(balances[p] - split_values[i]);
        });
      }
    });

    return successResponse(res, balances, "Balances calculated");
  } catch (error) {
    next(error);
  }
};

exports.getSettlementSummary = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    const balances = {};

    expenses.forEach(exp => {
      const total = exp.amount;
      const { paid_by, participants, split_type, split_values } = exp;

      const payer = normalize(paid_by);
      const part = participants.map(normalize);

      if (part.length === 0) return;

      [payer, ...part].forEach(p => {
        if (!balances[p]) balances[p] = 0;
      });

      balances[payer] = round(balances[payer] + total);

      if (split_type === 'equal') {
        const share = total / part.length;
        part.forEach(p => {
          balances[p] = round(balances[p] - share);
        });
      } else if (split_type === 'percentage') {
        part.forEach((p, i) => {
          const deduction = (split_values[i] / 100) * total;
          balances[p] = round(balances[p] - deduction);
        });
      } else if (split_type === 'exact') {
        part.forEach((p, i) => {
          balances[p] = round(balances[p] - split_values[i]);
        });
      }
    });

    const debtors = [], creditors = [];

    Object.entries(balances).forEach(([person, bal]) => {
      if (bal < -0.01) debtors.push({ person, amount: -bal });
      else if (bal > 0.01) creditors.push({ person, amount: bal });
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const settlements = [];

    while (debtors.length && creditors.length) {
      const debtor = debtors[0];
      const creditor = creditors[0];

      const settleAmount = Math.min(debtor.amount, creditor.amount);
      settlements.push({
        from: debtor.person,
        to: creditor.person,
        amount: round(settleAmount)
      });

      debtor.amount = round(debtor.amount - settleAmount);
      creditor.amount = round(creditor.amount - settleAmount);

      if (debtor.amount < 0.01) debtors.shift();
      if (creditor.amount < 0.01) creditors.shift();
    }

    return successResponse(res, settlements, "Settlement summary generated");
  } catch (error) {
    next(error);
  }
};
