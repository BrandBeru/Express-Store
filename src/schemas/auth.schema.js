const Joi = require('joi')

const token = Joi.string().min(20)
const newPassword = Joi.string().min(6).max(150);

const changePassword = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

module.exports = {changePassword}
