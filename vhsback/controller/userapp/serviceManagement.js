const serviceManagementModel = require("../../model/userapp/serviceMangament");

class serviceManagement {
  async addserviceManagement(req, res) {
    let {
      serviceName,
      serviceCategory,
      NofServiceman,
      serviceHour,
      serviceDesc,
      servicePrice,
      serviceGst,
      Subcategory,
      offerPrice,
      sub_subcategory,
      serviceExcludes,
      serviceIncludes,
 
      quantity,
      servicebelow,
      servicetitle,
      homepagetitle
    } = req.body;
    // const { morepriceData, ...otherData } = req.body;
    let file = req.file.filename;
    let add = new serviceManagementModel({
      serviceImg: file,
      serviceName: serviceName,
      serviceCategory: serviceCategory,
      NofServiceman: NofServiceman,
      serviceHour: serviceHour,
      serviceDesc: serviceDesc,
      servicePrice: servicePrice,
      serviceGst: serviceGst,
      Subcategory: Subcategory,
      offerPrice: offerPrice,
      sub_subcategory: sub_subcategory,
      serviceExcludes:serviceExcludes,
      serviceIncludes:serviceIncludes,
  
      quantity:quantity,
      servicebelow:servicebelow,
      servicetitle:servicetitle,
      homepagetitle:homepagetitle

    });
    // let save = add.save();
    // Save the user
    add.save().then((data) => {
      console.log(data);
      return res
        .status(200)
        .json({ success: "User added successfully", service: data });
    });
    // if (save) {
    //   console.log(save);
    //   return res.json({ sucess: "service added successfully" ,service:save});
    // }
  }

 
  async  addadvance(req, res) {
    const id = req.params.id;
    const { plans, Plansdetails, store_slots,serviceDirection,morepriceData } = req.body;
  
    try {
      const existingData = await serviceManagementModel.findById(id);
  
      if (!existingData) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
  
      // Update specific fields if new data is provided, otherwise keep existing data
      existingData.plans = plans || existingData.plans;
      existingData.Plansdetails = Plansdetails || existingData.Plansdetails;
      existingData.store_slots = store_slots || existingData.store_slots;
      existingData.serviceDirection = serviceDirection || existingData.serviceDirection;
      existingData.morepriceData = morepriceData || existingData.morepriceData;


  
      const updatedData = await existingData.save();
  
      return res.json({ success: true, data: updatedData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
  
  //edit serviceManagement
  async editserviceManagement(req, res) {
    let id = req.params.id;
    let {
      serviceName,
      serviceCategory,
      NofServiceman,
      serviceHour,
      serviceDesc,
      servicePrice,
      serviceGst,
      Subcategory,
      offerPrice,
      sub_subcategory,
      serviceExcludes,
      serviceIncludes,
    } = req.body;
  
    try {
      let data = await serviceManagementModel.findOneAndUpdate(
        { _id: id },
        {
          serviceName,
          serviceCategory,
          NofServiceman,
          serviceHour,
          serviceDesc,
          servicePrice,
          serviceGst,
          Subcategory,
          offerPrice,
          sub_subcategory,
          serviceExcludes,
          serviceIncludes,
        },
        { new: true } // Make sure to include this to return the updated document
      );
  
      if (data) {
        return res.json({ success: "Updated", service: data });
      } else {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
  
  async getserviceManagement(req, res) {
    let service = await serviceManagementModel.find({}).sort({ _id: -1 });
    if (service) {
      return res.json({ service: service });
    }
  }

  async postsubcategory(req, res) {
    let { subcategory } = req.body;
    console.log(subcategory);

    let data = await serviceManagementModel
      .find({ subcategory })
      .sort({ _id: -1 });

    if (subcategory) {
      return res.json({ subcatdata: data });
    }
  }

  async postdeleteserviceManagement(req, res) {
    let id = req.params.id;
    const data = await serviceManagementModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const ServiceManagemntController = new serviceManagement();
module.exports = ServiceManagemntController;
