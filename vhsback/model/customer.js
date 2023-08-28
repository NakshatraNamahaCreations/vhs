const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

  cardNo: {
    type: Number,
    default: 0, // or set it as required: true
  },
  EnquiryId: {
    type: Number,
 
  },
  customerName: {
    type: String,
  },
  category: {
    type: String,
  },
  contactPerson: {
    type: String,
    require: true,
  },
  mainContact: {
    type: Number,
    require: true,
  },
  alternateContact: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gst: {
    type: String,
 
  },
  rbhf: {
    type: String,
    require: true,
  },
  cnap: {
    type: String,
    require: true,
  },
  lnf: {
    type: String,
    require: true,
  },
  mainArea: {
    type: String,
  },
  city: {
    type: String,
  },
  pinCode: {
    type: Number,
  },
  customerType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    require: true,
  },
  color: {
    type: String,
  },
  instructions: {
    type: String,
  },
  approach: {
    type: String,
    require: true,
  },
  serviceExecute: {
    type: String,
  },
  treatmentdetails: {
    type: Array,
  },
}, {
  timestamps: true,
});

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
