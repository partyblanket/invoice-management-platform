const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
//note: username and password do not need to be in schema to work

let User = new Schema({

  name: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  salesIdArray: {
    type: [{_id: Schema.Types.ObjectId, saleid: Number}],
    default: []
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
    default: 1000,
  },
  logo: {
    type: String,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);