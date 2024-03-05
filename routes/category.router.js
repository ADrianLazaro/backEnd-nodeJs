const express = require('express');
const { faker }= require('@faker-js/faker');
const router = express.Router();

router.get('/',(req,res)=>{
  res.send('soy category');
})

// 2 parametros dinamicos
router.get('/categories/:categoryId/products/:productId',(req,res)=>{
  const {categoryId,productId} = req.params;
  res.json({
    productId,categoryId
  })
})

module.exports = router;
