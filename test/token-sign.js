const jwt = require('jsonwebtoken')

const secret = 'Giobero'
const payload = {
  sub: 1,
  scope: 'customer',
}

function signToken(payload, secret){
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)

console.log(token)
