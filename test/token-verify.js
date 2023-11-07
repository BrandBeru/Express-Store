const jwt = require('jsonwebtoken')

const secret = 'Giobero'

function verifyToken(token, secret){
  return jwt.verify(token, secret)
}
const tk = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoiY3VzdG9tZXIiLCJpYXQiOjE2OTkzMDU1OTB9._XdthUF4NPOG6-DAVUkkHrof4aOHqENVqJF7Y2T84xU'

const token = verifyToken(tk, secret)

console.log(token)
