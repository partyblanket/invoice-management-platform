
const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
//note: username and password do not need to be in schema to work

let User = new Schema({

  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'invalid email']
  },
  name: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  salesIdArray: {
    type: [Number]
  },
  company: {
    type: String,
  },
  addressLineOne: {
    type: String,
  },
  addressLineTwo: {
    type: String,
  },
  postcode: {
    type: String,
  },
  city: {
    type: String,
  },
  phone: {
    type: String,
  },
  nextSale: {
    type: Number,
  },
  logo: {
    type: String,
  },
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);