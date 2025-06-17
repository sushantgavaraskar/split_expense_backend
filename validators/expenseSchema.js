const Joi = require('joi');

const expenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().required(),
  paid_by: Joi.string().required(),
  participants: Joi.array().items(Joi.string()).min(1).required(),
  split_type: Joi.string().valid('equal', 'percentage', 'exact').required(),
  split_values: Joi.when('split_type', {
    is: 'equal',
    then: Joi.any().optional(),
    otherwise: Joi.array().items(Joi.number()).required()
  }),
  category: Joi.string().valid('Food', 'Travel', 'Utilities', 'Entertainment', 'Other').optional(),
  is_recurring: Joi.boolean().optional(),
  recurrence: Joi.string().valid('daily', 'weekly', 'monthly').when('is_recurring', {
    is: true,
    then: Joi.required()
  })
});

module.exports = expenseSchema;
