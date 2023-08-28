const customerModel = require("../model/customer");

class addcustomer {
  //add customer
  async addcustomer(req, res) {
    let {
      customerName,
      EnquiryId,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      serviceExecute,
    } = req.body;
    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

       // check if contact is already exists
       const existingContactno = await customerModel.findOne({
        mainContact: mainContact,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }


      // Create a new customer instance with the generated card number
      const customer = new customerModel({
        cardNo: newCardNo,
        EnquiryId,
        customerName,
        contactPerson,
        category,
        mainContact,
        alternateContact,
        email,
        gst,
        rbhf,
        cnap,
        lnf,
        mainArea,
        city,
        pinCode,
        customerType,
        size,
        color,
        instructions,
        approach,
        serviceExecute,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        return res.json({ success: "Customer added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //edit customer
  async editcustomer(req, res) {
    let id = req.params.id;

    let {
      cardNo,
      EnquiryId,
      customerName,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      serviceExecute,
    } = req.body;
    let data = await customerModel.findOneAndUpdate(
      { _id: id },
      {
        cardNo,
      EnquiryId,
      customerName,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      serviceExecute,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async addCustomersViaExcelSheet(req, res) {
    const data = req.body;

    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const customersWithCardNo = data.map((customer, index) => ({
        ...customer,
        cardNo: latestCardNo + index + 1,
      }));
      const inserteCustomer = await customerModel.insertMany(
        customersWithCardNo
      );

      if (inserteCustomer.length > 0) {
        return res.json({ success: "Customer added successfully" });
      } else {
        return res.status(400).json({ error: "Failed to add Customers" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

   async addservicedetails(req, res) {
    try {
      const id = req.params.id;
      const { treatmentdetails } = req.body;

      const doc = await customerModel.findByIdAndUpdate(
        id,
        { $push: { treatmentdetails: treatmentdetails } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //Get all customer
  async getallcustomer(req, res) {
    let data = await customerModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ customers: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await customerModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const customercontroller = new addcustomer();
module.exports = customercontroller;
