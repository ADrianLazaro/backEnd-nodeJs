const { faker } = require('@faker-js/faker');
const { v4: uuidv4, v4 } = require('uuid');
const boom = require('@hapi/boom');

class ProductService {
  products;
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct={
      id: uuidv4(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve,reject)=> {
      try{
        setTimeout(()=>{
          resolve(this.products);
        },1000);
      }catch(e){
        reject(e.message);
      }
    });
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found')
    }
    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id);

    if(index===-1){
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index]={
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async upd2(id,changes){
    return new Promise((resolve,reject)=>{
      try{
        const index= this.products.findIndex(p=>p.id===id);
        const product = this.products[index];
        if(index<0) reject('not found');
        this.products[index]={
          ...product,
          ...changes
        }
        resolve(this.products[index]);
      }catch(e){
        reject(e.meesage);
      }
    })
  }

  async delete(id){
    const index =  this.products.findIndex(item => item.id === id);
    if(index===-1){
      throw boom.notFound('product not found')
    }
    this.products.splice(index,1);
    return { id };
  }

}

module.exports = ProductService;
