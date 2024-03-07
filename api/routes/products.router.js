const express = require('express');
const ProductService = require('../services/product.service.js');
const validatorHandler = require('./../middlewares/validator.handler.js');
const {createProductSchema,updateProductSchema,getProductSchema} = require('./../schemas/product.schema.js');
const router = express.Router();
const service = new ProductService;

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
})
//  los especifico se ponen antes de los dinamicos, para que no haya
//  conflicto
// router.get('/filter', (req, res) => {
//   res.send('Yo soy un filter');
// });

//un parametro
router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
  const body = req.body;
  const newP = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: newP
  });
  }
);
//actualizar
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req, res, next)=>{
  try{
    const {id}= req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);
  }catch(error){
    next(error);
  }
}
);

router.delete('/:id',(req,res)=>{
  const {id}= req.params;
  const rpta = service.delete(id);
  res.json(rpta);
});

module.exports = router;
