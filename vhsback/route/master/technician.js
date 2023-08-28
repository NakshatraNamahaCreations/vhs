const technicianmodel = require("../../model/master/technician");
const multer = require("multer");
const express = require("express");
const router = express.Router();

//add technician
router.route("/addtechnician").post(async (req, res) => {
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance
  } = req.body;

   // Check if the contact already exists
   const contactnoExists = await technicianmodel.findOne({
    $or: [
      { number: number },
      // { email: loginnameOrEmail },
    ],
  });
  if (contactnoExists) {
    return res.status(500).json({ error: "Conatct Number already exists" });
  }
  let technician = new technicianmodel({
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    languagesknow,
    category,
    walletBalance
  });
  let save = technician.save();
  if (save) {
    return res.json({ success: "food created successfully" });
  }
});

//edit technician
router.route("/edittechnician/:id").post(async(req,res)=>{

  let id = req.params.id;
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance
  } = req.body;

  let data = await technicianmodel.findOneAndUpdate(
    { _id: id },
    {
      Type,
      servicetype,
      vhsname,
      smsname,
      number,
      password,
      experiance,
      city,
      category,
      languagesknow,
      walletBalance
    }
  );
  if (data) {
    return res.json({ success: "Updated" });
  }
})

//get alltechnicain
router.route("/getalltechnician").get(async (req, res) => {
  let technician = await technicianmodel.find({}).sort({ _id: -1 });
  if (technician) {
    return res.status(200).json({ technician: technician });
  } else {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//delete vendors
router.route("/deletetechnician/:id").post(async (req, res) => {
  let id = req.params.id;
  const data = await technicianmodel.deleteOne({ _id: id });
  return res.json({ sucess: "Delete successfuly" });
});

module.exports = router;
