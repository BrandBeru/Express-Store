const UserService = require('./user.service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const {config} = require('../../config/config')

const service = new UserService()
class AuthService{
  async getUser(email, password){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized()
    }
    const compare = await bcrypt.compare(password, user.password)
    if(!compare){
      throw boom.unauthorized()
    }
    delete user.dataValues.password;
    return user;
  }
  async signToken(user){
    const payload = {
      sub: user.id,
      scope: user.role,
    }
    delete user.dataValues.recoveryToken
    const token = jwt.sign(payload, config.jwtSecret)
    return {token, user}
  }
  async sendRecoveryPassword(email){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized()
    }
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'})
    await service.udpate(user.id,{
      recoveryToken: token
    })
    const link = `${config.frontedTokenUrl}/recovery?token=${token}`
    const mail = {
      from: 'brand.beru@gmail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "BeruStore - Reset your password", // Subject line
      html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`, // html body
    };

    return await this.sendMail(mail);
  }
  async changePassword(token, newPassword){
    try{
      const paylaod = jwt.verify(token, config.jwtSecret)
      const user = await service.findOne(paylaod.sub)
      if(user.recoveryToken !== token){
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 13)
      await service.udpate(user.id, {recoveryToken: null, password: hash})
      return {message: 'password changed'}
    }catch(error){
      throw boom.unauthorized()
    }
  }
  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: config.mailServer,
      secure: true,
      port: config.mailPort,
        auth: {
            user: config.mailEmail,
            pass: config.mailPassword
        }
    });
    await transporter.sendMail(infoMail)
    return { message: 'mail sent'}
  }
}

module.exports = AuthService
