const express = require("express");
const router = express.Router();
const paymentgetwaycontroller = require("../../controller/paymentgatway/payment");

router.post("/addpayment", paymentgetwaycontroller.initiatePayment);

// router.post("/pay", paymentgetwaycontroller.pay);
router.post(
  "/status/:merchantId/:merchantTransactionId/:userId",
  paymentgetwaycontroller.checkTransactionStatus
);
router.get(
  "/paymentstatus/:userId",
  paymentgetwaycontroller.getpaymentstatusByUserId
);

module.exports = router;
