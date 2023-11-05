const express = require('express')
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getCategorySchema, createCategorySchema } = require('../schemas/category.schema');
const router = express.Router()

const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find()
  res.json(categories)
})
router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  try{
    const {id} = req.params;
    const category = await service.findOne(id);
    res.json(category)
  }catch(error){
    next(error)
  }
})
router.post('/', validatorHandler(createCategorySchema, 'body'), async (req, res, next) => {
  try{
    const body = req.body;
    const category = await service.create(body);
    res.status(201).json(category)
  }catch(err){
    next(err)
  }
})
router.patch('/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    const body = req.body
    const category = await service.udpate(id, body)
    res.json(category)
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
