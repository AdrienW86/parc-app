const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  number: Number,
  street: String,
  zipcode: Number,
  city: String,
  country: String,
});

const labelSchema = new mongoose.Schema({
  label: String,
  color: String,
  comment: String,
 
});

const pieceSchema = new mongoose.Schema({
  name: String,
  sol: labelSchema,
  meubles: labelSchema,
  plafond: labelSchema,
  electricity: labelSchema,
// exitSol: String,
//  exitMeubles: String,
//  exitPlafond: String,
//  exitElectricity: String,
//  plafondComment: String,
//  electricityComment: String,
//  solComment: String,
//  meublesComment: String,
});

const auditSchema = new mongoose.Schema({
  firstname: String,
  name: String,
  date: Date,
  departure: String,
  userSignature: String,
  clientSignature: String,
  address: addressSchema,
  pieces: [pieceSchema],

});

const userSchema = new mongoose.Schema({
  name: String,
  siret: Number,
  phone: String,
  email: String,
  password: String,
  website: String,
  address: addressSchema,
  openAudit: [auditSchema],
  closeAudit: [auditSchema],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
