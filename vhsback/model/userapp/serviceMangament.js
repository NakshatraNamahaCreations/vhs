const mongoose = require("mongoose");

const serviceManagementSchema = new mongoose.Schema({
  serviceImg: {
    type: String,
  },
  serviceName: {
    type: String,
  },
  Subcategory: {
    type: String,
  },
  serviceCategory: {
    type: String,
  },
  NofServiceman: {
    type: String,
  },
  offerPrice: {
    type: String,
  },
  serviceHour: {
    type: String,
  },
  serviceDesc: {
    type: String,
  },
  servicePrice: {
    type: String,
  },
  serviceGst: {
    type: String,
  },
  plans:{
    type:Array
  },
  Plansdetails:{
    type:Array
  },
  store_slots:{
    type:Array
  },
  sub_subcategory:{
    type:String
  },
  serviceExcludes:{
    type:String
  },
  serviceIncludes:{
    type:String
  },
  morepriceData: [
    {
      pName: String,
      pofferprice: String,
      pPrice: String,
      pservices: String,
    }
  ],
  quantity:{
    type:String
  },
  servicetitle:{
    type:String
  },
  servicebelow:{
    type:String
  },
  homepagetitle:{
    type:String
  },
  serviceDirection:{
    type:String
  }
});

const serviceManagementModel = mongoose.model(
  "serviceManagement",
  serviceManagementSchema
);
module.exports = serviceManagementModel;
