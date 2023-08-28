const addcallModel = require("../model/addcall");

class addcall {
  //add customer
  async save(req, res) {
    let {
      cardNo,
      serviceDate,
      bookingDate,
      jobCategory,
      priorityLevel,
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      backofficerExe,
      backofficerno,
      techName,
      salesExecutive,
      showinApp,
      sendSms,
      inSignDateTime,
      outSignDateTime,
      jobComplete,
      category,
      amount,
      type,
      jobType
    } = req.body;
    try {
      // Get the latest card number from the database
      const latestCustomer = await addcallModel
        .findOne()
        .sort({ complaintRef: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.complaintRef : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      // Create a new customer instance with the generated card number
      const customer = new addcallModel({
        cardNo,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef: newCardNo,
        priorityLevel,
        appoDate,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        return res.json({ success: "dsr data added successfully" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editdsr(req, res) {
    let id = req.params.id;

    let {
      cardNo,
      serviceDate,
      category,
      bookingDate,
      jobCategory,
      complaintRef,
      priorityLevel,
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      salesExecutive,
      backofficerExe,
      backofficerno,
      techName,
      showinApp,
      sendSms,
      type,
      inSignDateTime,
      outSignDateTime,
      jobComplete,
      amount,
      jobType
    } = req.body;
    let data = await addcallModel.findOneAndUpdate(
      { _id: id },
      {
        cardNo,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef,
        priorityLevel,
        appoDate,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async postcategory(req, res) {
    let { category } = req.body;
    let data = await addcallModel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ addcall: data });
    }
  }
  async getallagreedata(req, res) {
    try {
      let data = await addcallModel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "servicedetails",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "quotes",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "quotedata",
          },
        },
      ]);
      if (data) {
        return res.json({ addcall: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getalldsrcall(req, res) {
    let data = await addcallModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ addcall: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await addcallModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const addcallcontroller = new addcall();
module.exports = addcallcontroller;
