const Joi = require('joi')

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50)
const lastName = Joi.string().min(5).max(100)
const phone = Joi.string().min(5).max(12)
const userId = Joi.number().integer()
const email = Joi.string().min(5).max(100)
const password = Joi.string().min(5).max(150)

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId,
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});
const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
});
const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {createCustomerSchema, updateCustomerSchema, getCustomerSchema}
