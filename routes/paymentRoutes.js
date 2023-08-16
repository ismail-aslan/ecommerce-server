const express = require("express");
const router = express.Router();
const paymentController = require("./../controllers/paymentController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");
const bodyParser = require("body-parser");

router
  .get(
    "/",
    validateToken,
    checkEmailVerification,
    paymentController.createCheckoutSession
  )
  .post(
    "/process-payment",
    bodyParser.raw({ type: "application/json" }),
    paymentController.stripeWebhook
  );

module.exports = router;
