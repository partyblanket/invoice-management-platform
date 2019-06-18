
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

let Sale = new Schema({
  status: String,
  owner: Schema.Types.ObjectId,
  invoiceid: {type: Number, required: true, unique: false},
  billingCompany: String,
  billingName: String,
  billingPhone: String,
  billingAddressLineOne: String,
  billingAddressLineTwo: String,
  billingPostcode: String,
  billingCity: String,
  shippingCompany: String,
  shippingName: String,
  shippingPhone: String,
  shippingAddressLineOne: String,
  shippingAddressLineTwo: String,
  shippingPostcode: String,
  shippingCity: String,
  shippingDate: String,
  invoiceDate: String,
  includingTax: Boolean,
  paymentTerms: String,
  dueDate: String,
  currency: String,
  invoiceLines: [{
    amount: Number,
    sku: String,
    price: Number,
    description: String,
    vat: Number,
    total: Number
  }],
  privateNote: String,
  terms: String,
  incVat: Boolean,
  totalVat: Number,
  totalExVat: Number,
  totalIncVat: Number,
});

module.exports = mongoose.model('sale', Sale);