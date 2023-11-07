const bcrypt = require('bcrypt')

async function hashPassword(){
  const myPassword = 'admin123.'
  const hash = await bcrypt.hash(myPassword, 13)
  console.log(hash)
}

hashPassword()
