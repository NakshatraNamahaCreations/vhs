const serviceManagementModel = require("../../model/userapp/serviceMangament");

class serviceManagement {
  async addserviceManagement(req, res) {
    let {
      serviceName,
      category,
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
      serviceDirection,

      servicebelow,
      servicetitle,
      homepagetitle,
      Inimg,
      Eximg,
      qty,
      quantity
    } = req.body;

    const parsedServiceDesc = JSON.parse(serviceDesc);

    const parsedServiceExcludes = JSON.parse(serviceExcludes);
    const parsedServiceIncludes = JSON.parse(serviceIncludes);
    let file = req.files[0].filename;
    let file1 = req.files[1].filename;
    let file2= req.files[2].filename;
    let file3= req.files[3].filename;


    let add = new serviceManagementModel({
      serviceImg: file,
      serviceName: serviceName,
      category:category,
      serviceCategory: serviceCategory,
      NofServiceman: NofServiceman,
      serviceHour: serviceHour,
      serviceDesc: parsedServiceDesc,
      servicePrice: servicePrice,
      serviceGst: serviceGst,
      Subcategory: Subcategory,
      offerPrice: offerPrice,
      sub_subcategory: sub_subcategory,
      serviceExcludes: parsedServiceExcludes, // Use the parsed objects
      serviceIncludes: parsedServiceIncludes, // Use the parsed objects
      serviceDirection: serviceDirection,
      quantity: quantity,
      servicebelow: servicebelow,
      servicetitle: servicetitle,
      homepagetitle: homepagetitle,
      Desimg:file1,
      Inimg:file2,
      Eximg:file3,
      qty,
      quantity
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

  async deteleindexvalue(req, res) {
    const { index } = req.params;

    if (index < 0 || index >= data.length) {
      return res.status(404).json({ message: "Index not found" });
    }

    data.splice(index, 1);
    saveDataToFile(); // Save the updated data to the file

    res.json({ message: "Data deleted successfully" });
  }

  async addadvance(req, res) {
    const id = req.params.id;
    const {
      plans,
      Plansdetails,
      store_slots,

      morepriceData,
    } = req.body;

    try {
      const existingData = await serviceManagementModel.findById(id);

      if (!existingData) {
        return res
          .status(404)
          .json({ success: false, message: "Data not found" });
      }

      // Update specific fields if new data is provided, otherwise keep existing data
      existingData.plans = plans || existingData.plans;
      existingData.Plansdetails = Plansdetails || existingData.Plansdetails;
      existingData.store_slots = store_slots || existingData.store_slots;
 
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
      category,
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
      serviceDirection,
      quantity,
      servicebelow,
      servicetitle,
      homepagetitle,
    } = req.body;

    // let file = req.file.filename;
    try {
      let data = await serviceManagementModel.findOneAndUpdate(
        { _id: id },
        {
          // serviceImg: file,
          serviceName,
      category,
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
      serviceDirection,
      quantity,
      servicebelow,
      servicetitle,
      homepagetitle,
        },
        { new: true } // Make sure to include this to return the updated document
      );

      if (data) {
        return res.json({ success: "Updated", service: data });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Data not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
  async updateServices(req, res) {
    try {
      const serviceId = req.params.id;
      const {
        serviceName,
        category,
        Subcategory,
        sub_subcategory,
        serviceDesc,
        servicetitle,
        servicebelow,
        serviceIncludes,
        serviceExcludes,
        homepagetitle,
        serviceGst,
        serviceDirection,
        serviceHour,
        NofServiceman,
      } = req.body;
      const file = req.file?.filename;

      const findService = await serviceManagementModel.findOne({
        _id: serviceId,
      });
      if (!findService) {
        return res.json({ error: "No such record found" });
      }
      //
      findService.serviceName = serviceName || findService.serviceName;
      findService.category = category || findService.category;
      findService.Subcategory = Subcategory || findService.Subcategory;
      findService.sub_subcategory =
        sub_subcategory || findService.sub_subcategory;

      findService.serviceDesc = Array.isArray(serviceDesc)
        ? serviceDesc?.map((i) => JSON.parse(i))
        : [JSON.parse(serviceDesc)] || findService.serviceDesc;

      findService.servicetitle = servicetitle || findService.servicetitle;
      findService.servicebelow = servicebelow || findService.servicebelow;

      findService.serviceIncludes = Array.isArray(serviceIncludes)
        ? serviceIncludes?.map((i) => JSON.parse(i))
        : [JSON.parse(serviceIncludes)] || findService.serviceIncludes;

      findService.serviceExcludes = Array.isArray(serviceExcludes)
        ? serviceExcludes?.map((i) => JSON.parse(i))
        : [JSON.parse(serviceExcludes)] || findService.serviceExcludes;

      findService.homepagetitle = homepagetitle || findService.homepagetitle;
      findService.serviceGst = serviceGst || findService.serviceGst;
      findService.serviceDirection =
        serviceDirection || findService.serviceDirection;
      findService.serviceHour = serviceHour || findService.serviceHour;
      findService.NofServiceman = NofServiceman || findService.NofServiceman;
      if (file) {
        findService.serviceImg = file;
      }

      const updateCategory = await serviceManagementModel.findOneAndUpdate(
        { _id: serviceId },
        findService,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
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

  async deletebyindex(req, res) {
    try {
      const { id, index } = req.params;

      const data = await serviceManagementModel.findById(id);

      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }

      // Remove the item at the specified index from store_slots
      data.store_slots.splice(index, 1);

      // Save the updated document
      await data.save();

      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deletebyindexofprice(req, res) {
    try {
      const { id, index } = req.params;

      const data = await serviceManagementModel.findById(id);

      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }

      // Remove the item at the specified index from store_slots
      data.morepriceData.splice(index, 1);

      // Save the updated document
      await data.save();

      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
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
