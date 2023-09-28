const axios = require("axios");
const sha256 = require("sha256");
const Paymentgetwaymodel = require("../../model/paymentgatway/payment");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

class Paymentgetway {
  async initiatePayment(req, res) {
    try {
      const transactionId = uuidv4();
      console.log("id", transactionId);
      const { amount } = req.body;
      //   amount = parseFloat(amount).toFixed(2);
      // Save payment details
      const newpayment = new Paymentgetwaymodel({
        amount,
      });
      const savedProfile = await newpayment.save();

      if (!savedProfile) {
        return res.status(500).json({ error: "Something went wrong" });
      }

      // Construct payment data
      const base64 = Buffer.from(
        JSON.stringify({
          merchantId: "M1PX7BZG1R4G",
          merchantTransactionId: transactionId,
          merchantUserId: "nnc123",
          amount,
          redirectUrl: "",
          redirectMode: "POST",
          callbackUrl: `http://192.168.1.67:8000/api/payment/status/M1PX7BZG1R4G/${transactionId}`,
          mobileNumber: "9900566466",
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        })
      ).toString("base64");
      console.log("base64===", base64);

      const sha256encode =
        sha256(base64 + "/pg/v1/paya01d076b-dc15-4c1f-bac8-c53852439d04") +
        "###1";
      console.log("sha256encode===", sha256encode);

      // Send payment initiation response
      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        base64,
        sha256encode,
        merchantId: "M1PX7BZG1R4G",
        merchantTransactionId: transactionId,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      return res.status(500).json({
        success: false,
        message: "Payment initiation failed. Please try again.",
      });
    }
  }

  async checkTransactionStatus(req, res) {
    const { merchantId, merchantTransactionId, userId } = req.params;
    const saltKey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const url = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const xVerify =
      crypto
        .createHash("sha256")
        .update(url + saltKey)
        .digest("hex") +
      "###" +
      1;

    try {
      const response = await axios.get(
        `https://api.phonepe.com/apis/hermes${url}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerify,
            " X-MERCHANT-ID": "M1PX7BZG1R4G",
          },
        }
      );

      response.data.data.paymentInstrument = JSON.stringify(
        response.data.data.paymentInstrument
      );

      // Save the responseData to MongoDB
      if (response.data.code === "PAYMENT_SUCCESS") {
        const responseData = new Paymentgetwaymodel({
          userId: userId,
          code: response.data.code,

          data: response.data.data,
          message: response.data.message,
          success: response.data.success,
        });
        await responseData.save();
      }

      return res.status(200).json({
        success: true,
        responseData: response.data,
      });
      return res.status(500).json({
        success: false,
        responseData: response.data,
      });
    } catch (error) {
      console.error("Error checking transaction status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check transaction status.",
      });
    }
  }

  async getpaymentstatusByUserId(req, res) {
    let userId = req.params.userId;
    try {
      const status = await Paymentgetwaymodel.find({
        userId,
      });

      if (status) {
        return res.json({ getPaymentStatus: status });
      } else {
        return res.json({ getPaymentStatus: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch user status" });
    }
  }
}

const paymentgetwaycontroller = new Paymentgetway();
module.exports = paymentgetwaycontroller;
