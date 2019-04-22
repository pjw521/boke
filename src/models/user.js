"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema= new Schema({
  name:{type:String,unique:true},
  email:{type:String},
  password:String,
  nickname:String,
  about:String
});
const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;