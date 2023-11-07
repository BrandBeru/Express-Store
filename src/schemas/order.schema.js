const Joi = require('joi')

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});


const getOrderSchema = Joi.object({
  id: id.required()
});

module.exports = {getOrderSchema, addItemSchema}
