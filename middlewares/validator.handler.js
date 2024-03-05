const boom = require('@hapi/boom');

function validatorHandler(schema,property){
  return (req,res,next) =>{
    const data = req[property]; //puede venir en query,body,params
    const {error} = schema.validate(data, {abortEarly :false}); //abortEarly muestra todos los errores
    if(error){
     next(boom.badRequest(error)) ;
    }
    next();
  }
}

module.exports = validatorHandler;
