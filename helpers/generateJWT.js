const jwt = require("jsonwebtoken");

const generateJWT = ( uid = '') => {
  return new Promise((resolve,reject) => {
    
    const payload = {uid};

    jwt.sign(payload,process.env.PRIVATE_KEY,{
      expiresIn:"4h"
    },
    (err,token) => {
        if(!err){
          resolve(token);
        }else{
          console.log(err);
          reject("No se pudo generar el token");
        }
    })
    
  })
}


module.exports = {
  generateJWT
}