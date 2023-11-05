const {Model, DataTypes, Sequelize} = require('sequelize')
const { CUSTOMER_TABLE } = require('./customer.model')
const ORDER_TABLE = 'orders'

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items.length){
        return this.items.reduce((total,item) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0)
      }
      return 0
    }
  }
}

class Order extends Model {
  static associate(models){
    this.belongsTo(models.Customer, {
      as: 'customer',
    })
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'order_id',
      otherKey: 'product_id'
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {ORDER_TABLE, OrderSchema, Order}
