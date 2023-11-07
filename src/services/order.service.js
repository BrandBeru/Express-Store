const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if(!customer){
      throw boom.notFound('customer not found')
    }
    const order = await models.Order.create({
      customerId: customer.id
    });

    return order;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);

    return newItem;
  }
  async find() {
    const orders = await models.Order.findAll();

    return orders;
  }
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('product not found');
    }
    return order;
  }
  async findbyUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }
  async update(id, changes) {
    const order = this.findOne(id);
    const rta = await order.update(changes);

    return rta;
  }
  async delete(id) {
    const order = this.findOne(id);
    await order.destroy();
  }
}
module.exports = OrderService;
