require("dotenv").config();
const express = require("express");
const pirates = require("../routes/pirates");


class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.piratesPath = "/api/pirates";

    this.middlewares();
    this.router();
  }


  middlewares(){
    this.app.use(express.json());
  }

  router(){
    this.app.use(this.piratesPath,pirates)

  }

  listen(){
    this.app.listen(this.port,() => {
      console.log("Server corriendo en el puerto", this.port);
    })
  }

}


module.exports = Server;