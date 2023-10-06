const express = require("express");
const router = express.Router();
const sPaymentcontroller = require("../../controller/paymentgatway/servicePayment");


router.get(
  "/servicePaymentstatus/:userId",
  sPaymentcontroller.getpaymentstatusByUserId
);
router.get("/getservicePayments", sPaymentcontroller.getAllPayment);

module.exports = router;