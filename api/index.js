const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');

const { logErrors,errorHandler, boomErrorHandler } =require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json()); //middleware
const whitelist = ['http://localhost:8080','https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'), false);
    }
  }
}

app.use(cors()); //habilitamos cualquier dominio
app.get('/api',(req,res)=> {
  res.send('hola mi server en express')
})
app.get('/api/nueva-ruta',(req,res)=> {
  // res.send('hola, soy una nueva ruta');
  res.send('about');
})
app.get('/api/Practica',(req,res)=>{
  res.json({
    name: 'Erick',
    lastname:'Adrian',
    DonationO: true,
    edad: 26,
    address: {
      city: 'Lima',
      codP: 28,
      street: 'Calle Santa Rosa',
    },
  })
})

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port,()=>{
  console.log('port',port);
})








