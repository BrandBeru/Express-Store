const express = require('express')

const categoriesRouter = require('./categories')
const productsRouter = require('./products')
const usersRouter = require('./users')
const customerRouter = require('./customer')
const orderRouter = require('./order')
const authRouter = require('./auth')
const profileRouter = require('./profile')

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter),
  router.use('/categories', categoriesRouter),
  router.use('/users', usersRouter)
  router.use('/customers', customerRouter)
  router.use('/orders', orderRouter)
  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
}

module.exports = routerApi
