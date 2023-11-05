const express = require('express')

const categoriesRouter = require('./categories')
const productsRouter = require('./products')
const usersRouter = require('./users')
const customerRouter = require('./customer')
const orderRouter = require('./order')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter),
  router.use('/categories', categoriesRouter),
  router.use('/users', usersRouter)
  router.use('/customers', customerRouter)
  router.use('/orders', orderRouter)
}

module.exports = routerApi
