const { Schema, model} = require("mongoose");


const PirateSchema = new Schema({
  name:{
    type:String,
    require:[true,"El nombre es requerido"]
  },
  password:{
    type:String,
    require:[true,"El password es requerido"]
  },

});


PirateSchema.methods.toJSON = function() {
  const {__v, _id, ...rest} = this.toObject();

  rest.uid = _id;

  return rest;

}

const Pirate = model("Pirate",PirateSchema);

module.exports = Pirate;