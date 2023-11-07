const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const OrderService = require('../services/order.service');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  const orders = await service.find();
  res.json(orders);
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try{
      const id = req.user.sub;
      const newOrder = await service.create({
        userId: id
      });
      res.status(201).json(newOrder);
    }catch(error){
      next(error)
    }
  },
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
