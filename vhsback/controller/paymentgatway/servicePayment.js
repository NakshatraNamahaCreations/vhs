
const sPaymentmodel = require("../../model/paymentgatway/servicePayment");

class sPayment {

  async getpaymentstatusByUserId(req, res) {
    let userId = req.params.userId;
    try {
      const status = await sPaymentmodel.find({
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
  async getAllPayment(req, res) {
    try {
      const payment = await sPaymentmodel.find({});
      if (payment) {
        res.status(200).json({ success: payment });
      } else {
        res.status(404).json({ error: "something went wrong" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }
}

const sPaymentcontroller = new sPayment();
module.exports = sPaymentcontroller;