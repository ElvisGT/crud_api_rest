const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const Pirate = require("../models/pirate");

const login = async(req,res) => {
  const {name,password} = req.body;

  //Verificar si existe en la base de datos
  const pirate = await Pirate.findOne({name});

  if(!pirate){
    return res.status(401).json({
      msg:"El usuario no existe"
    })
  };

  //Verificar password
  const isPasswordCorrect = bcrypt.compareSync(password,pirate.password);

  if(!isPasswordCorrect){
    return res.status(401).json({
      msg:"El password no es correcto"
    })
  };

  //Generar token
  const token = await generateJWT(pirate._id);

  res.json({
    pirate,
    token
  })
}


module.exports = {
  login
}