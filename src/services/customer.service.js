const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt')

class CustomerService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 13)
    const hashData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    if (data.user) {
      const customer = await models.Customer.create(hashData, {
        include: ['user']
      });
      return customer;
    }
    const customer = await models.Customer.create(data);
    delete customer.dataValues.user.dataValues.password;
    return customer;
  }
  async find() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['customer']
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);

    return rta;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }
}
module.exports = CustomerService;
