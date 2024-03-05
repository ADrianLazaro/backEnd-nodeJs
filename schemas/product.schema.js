const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().alphanum().min(3).max(15).message({
  'string.base': `"nombre" debe ser un tipo de 'texto'`,
  'string.empty': `"nombre" no puede ser un campo vacío`,
  'string.min' : `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});
const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image
});
const getProductSchema = joi.object({
  id:id.required(),
});

module.exports= {createProductSchema,updateProductSchema,getProductSchema};

