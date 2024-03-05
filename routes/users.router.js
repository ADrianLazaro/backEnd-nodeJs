const express = require('express');
const { v4: uuidv4, v4 } = require('uuid');
const UserService = require('../services/user.service.js');
const router = express.Router();
const userService = new UserService;

router.get('/',async (req,res)=>{
  const users = await userService.find();
  res.json(users);
})


router.get('/:id',async (req,res)=>{
  const {id} = req.params;
  const user = await userService.findOne(id);
  res.json(user);
});

router.post('/',async (req,res)=>{
  const data = req.body;
  const newUser = await userService.create(data);
  res.status(201).json({
    status: 'created',
    data:newUser
  });
});

router.patch('/:id',async (req,res)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const user = await userService.update(id,body);
    res.json(user);
  }catch(e){
    res.status(404).json({
      message: e.message
    });
  }
})

router.delete('/:id',async (req,res)=>{
  try{
    const {id} =req.params;
    const rpta = await userService.delete(id);
    res.json(rpta);
  }catch(e){
    res.status(404).json({
      message: e.message
    })
  }

});


module.exports= router;
