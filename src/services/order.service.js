const boom = require('@hapi/boom')
const {models} = require('../libs/sequelize');

class OrderService {
  constructor() {
  }
  async create(data) {
      const order = await models.Order.create(data);

      return order;
  }
  async addItem(data) {
      const newItem = await models.OrderProduct.create(data);

      return newItem;
  }
  async find() {
    const orders = await models.Order.findAll();

    return orders
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: ['user']
      },
      'items'
    ]
    })
    if(!order){
      throw boom.notFound('product not found')
    }
    return order
  }
  async update(id, changes) {
    const order = this.findOne(id)
    const rta = await order.update(changes)

    return rta;
  }
  async delete(id) {
    const order = this.findOne(id)
    await order.destroy()
  }
}
module.exports = OrderService;
