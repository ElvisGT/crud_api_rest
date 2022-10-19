const {request,response} = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { conection } = require("../database/config");
const Pirate = require("../models/pirate");

class Pirates {
  constructor(){
    this._piratesArr = [];
    this.path = './database/data.json';
    
  }

  getPirates = async(req = request, res = response) => {

    //Obtener de la BD
    const pirates = await Pirate.find({});
    
    res.json({
      pirates
    });
  };

  createPirates = (req = request, res = response) => {
    const {password,name} = req.body;
    const pirate = new Pirate({name,password});

    //Encriptar la contrasenia
    const salt = bcryptjs.genSaltSync();
    pirate.password = bcryptjs.hashSync(password,salt);

    //Save DB
    pirate.save();

    res.json({
      msg: "Creado exitosamente",
    });
  };

  updatePirates = async(req = request, res = response) => {
    const {name,password} = req.body;
    const id = req.uid;

      //Actualizar en DB
      await Pirate.findByIdAndUpdate(id, { name,password });
      
      res.json({
        msg: "Actualizado exitosamente",
      });
     
  };
  
  deletePirates = (req = request, res = response) => {
    const { id } = req.params;

    //Algoritmo para buscar en el arreglo el id
    const pirateId = this._piratesArr.findIndex( item => item.id === id);


    if(pirateId !== -1){
      const newArr = this._piratesArr.filter(item => item.id !== this._piratesArr[pirateId].id);
      this._piratesArr = newArr;
      
    }

    res.json({
      msg: "Eliminado exitosamente",
    });
  };

}

module.exports = Pirates;
