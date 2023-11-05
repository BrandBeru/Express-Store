const {Model, DataTypes} = require('sequelize')

const SELLER_TABLE = 'sellers'

const SellerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  session: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  lastLog: {
    allowNull: false,
    type: DataTypes.TIME,
    field: 'last_log'
  },
  monthSales: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    field: 'month_sales'
  },
  yearSales: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    field: 'year_sales'
  },
  usr: {
    allowNull: false,
    type: DataTypes.STRING
  },
  passwd: {
    allowNull: false,
    type: DataTypes.STRING
  }
}

class Seller extends Model {
  static associate(){
    //associate
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: SELLER_TABLE,
      modelName: 'Seller',
      timestamps: false
    }

  }
}

module.exports = {SELLER_TABLE, SellerSchema, Seller}
