const jwt = require("jsonwebtoken");
const Pirate = require("../models/pirate");

const verifyJWT = async(req,res,next) => {
  const token = req.header('x_token');
  
  //Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      msg: "No existe el token",
    });
  }
  
  try {
    
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const id = await Pirate.findById(uid);

    req.uid = id;

    next();
    
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};


module.exports = {verifyJWT};