const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize');

class CategorySchema{
  constructor(){
  }
  async create(data){
    const category = await models.Category.create(data);

    return category;
  }
  async update(id, data){
    const category = this.findOne(id)
    const rta = (await category).update(data)

    return rta
  }
  async find(){
    const categories = await models.Category.findAll()

    return categories;
  }
  async findOne(id){
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    if(!category){
      throw boom.notFound('category not found')
    }
    return category
  }
  async delete(id){
    const category = this.findOne(id)
    (await category).destroy()
  }
}

module.exports = CategorySchema;
