const bcrypt = require('bcrypt')

async function verifyPassword(){
  const myPassword = 'admin12320.'
  const hashPass = '$2b$13$cXj/39dgpKIoLkWDyfTyiOfvdOQnLsW8qgdlbspNTuXc4tkD3GgHS'
  const compare = await bcrypt.compare(myPassword, hashPass)
  console.log(compare)
}

verifyPassword()
