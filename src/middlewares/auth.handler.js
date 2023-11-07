const boom = require('@hapi/boom')
const {config} = require('../../config/config')

function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey){
    next()
    return;
  }
  next(boom.unauthorized())
}

function checkAdminRole(req, res, next){
  const user = req.user;
  if(user.scope === 'admin'){
    next();
  }else{
    next(boom.unauthorized())
  }
}
function checkRoles(...roles){
  return(req,res,next) => {
    const user = req.user;
    console.log(roles)
    if(roles.includes(user.scope)){
      next();
    }else{
      next(boom.unauthorized())
    }
  }
}

module.exports = {checkApiKey, checkAdminRole, checkRoles}
