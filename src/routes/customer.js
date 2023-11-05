const express = require('express')
const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCustomerSchema, createCustomerSchema } = require('../schemas/customer.schema');
const router = express.Router()

const service = new CustomerService();

router.get('/', async (req, res) => {
  const users = await service.find()
  res.json(users)
})
router.get('/:id', validatorHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await service.findOne(id);
    res.json(user)
  }catch(error){
    next(error)
  }
})
router.post('/', validatorHandler(createCustomerSchema, 'body'), async (req, res, next) => {
  try{
    const body = req.body;
    const user = await service.create(body);
    res.status(201).json(user)
  }catch(err){
    next(err)
  }
})
router.patch('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const user = await service.udpate(id, body)
    res.json(user)
  }catch(error){
    next(error)
  }
})
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  const response = await service.delete(id);
  res.json(response);
})

module.exports = router
