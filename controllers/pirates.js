const fs = require('fs');
const {request,response} = require("express");

class Pirates {
  constructor(){
    this._piratesArr = [];
    this.path = './database/data.json';
    
    this.getDB();
  }

  getPirates = (req = request, res = response) => {
    res.json({
      data: this._piratesArr,
    });
  };

  createPirates = (req = request, res = response) => {
    const body = req.body;
    this._piratesArr.push(body);

    //Save DB
    this.saveDB();

    res.json({
      msg: "Creado exitosamente",
    });
  };

  updatePirates = (req = request, res = response) => {
    const { id } = req.params;
    const body = req.body;

    //Algoritmo para buscar en el arreglo el id
    const pirateId = this._piratesArr.findIndex( item => item.id === id);


    if(pirateId !== -1){
      this._piratesArr[pirateId] = body;
      //Save DB
      this.saveDB();
    }

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
      
      this.saveDB();
    }

    res.json({
      msg: "Eliminado exitosamente",
    });
  };

  getDB(){
    let data = [];

    if(fs.existsSync(this.path)){
       data = JSON.parse(fs.readFileSync(this.path));
    }
    
    this._piratesArr = data;
  }

  saveDB(){
    //Save DB
    fs.writeFileSync(this.path,JSON.stringify(this._piratesArr));
  }
}

module.exports = Pirates;
