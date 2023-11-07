const express = require('express');
const passport = require('passport')
const router = express.Router();

const AuthService = require('../services/auth.service');
const { changePassword } = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');

const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session:false}),
  async (req, res, next) => {
  try{
    const user = req.user
    const rta = await service.signToken(user)
    console.log(rta)
    res.json(rta)
  }
  catch(error){
    next(error);
  }
});
router.post('/recovery',
  async (req, res, next) => {
  try{
    const {email} = req.body
    const rta = await service.sendRecoveryPassword(email)
    res.json(rta)
  }
  catch(error){
    next(error);
  }
});
router.post('/change-password',
  validatorHandler(changePassword, 'body'),
  async (req, res, next) => {
  try{
    const {token,newPassword} = req.body
    const rta = await service.changePassword(token, newPassword)
    res.json(rta)
  }
  catch(error){
    next(error);
  }
});

module.exports = router;
