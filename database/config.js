const mongoose = require("mongoose");

const conection = mongoose.connect(process.env.MONGODB)
                          .then(data => console.log("Conectado correctamente a la base de datos"))
                          .catch(err => console.log("Error al conectar a la base de datos"));


module.exports = { 
  conection
}