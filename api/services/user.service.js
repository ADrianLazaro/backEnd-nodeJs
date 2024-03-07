const {faker } = require('@faker-js/faker');
const { v4: uuidv4, v4 } = require('uuid');


class UserService{
  users;
  constructor(params) {
    this.users=[];
    this.generate();
  }

  generate(){
    const limit = 100;
    for(let i=0;i<limit;i++){
      this.users.push({
        id:uuidv4(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        gender: faker.person.gender(),
        job: faker.person.jobTitle()
      })
    }
  }

  async find(){
    return this.users;
  }

  async findOne(id){
    return this.users.find(item => item.id === id);
  }

  async create(data){
    const newUser={
      id:uuidv4(),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id,changes){
    return new Promise((resolve,reject)=>{
      try{
        const index = this.users.findIndex(u=>u.id===id);
        const user = this.users[index];
        if(index<0) reject('not found');
        this.users[index]={
          ...user,
          ...changes
        }
        resolve(this.users[index]);
      }catch(error){
        reject(error.message);
      }
    });
  }

  async delete(id){
    return new Promise((resolve,reject)=>{
      try{
        const index =  this.users.findIndex(item => item.id === id);
        if(index<0) reject('not found');
        this.users.splice(index,1);
        resolve('User deleted successfully');
      }catch(e){
        reject(e.message);
      }
    })
  }

}

module.exports= UserService;
