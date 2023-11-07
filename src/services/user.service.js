const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const {models} = require('../libs/sequelize');

class UserService{
  constructor(){
    this.users = []
  }
  async create(data){
    const hash = await bcrypt.hash(data.password, 13)
    const user = await models.User.create({
      ...data,
      password: hash
    })
    delete user.dataValues.password
    return user;
  }
  async find(){
    const rta = await models.User.findAll({
      include: ['customer']
    })
    return  rta;
  }
  async findOne(id){
    const user = await models.User.findByPk(id)
    if(!user){
      throw boom.notFound('user not found')
    }
    return user;
  }
  async findByEmail(email){
    const user = await models.User.findOne({
      where: {email}
    })
    if(!user){
      throw boom.notFound('user not found')
    }
    return user;
  }
  async udpate(id, changes){
    const user = await this.findOne(id)
    const rta = await user.update(changes)

    return rta;
  }
  async delete(id){
    const user = await this.findOne(id)
    await user.destroy()

    return {id}
  }
}

module.exports = UserService;
