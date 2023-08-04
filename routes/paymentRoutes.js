const express = require("express");
const router = express.Router();
const paymentController = require("./../controllers/paymentController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router;
//   .get("/", validateToken, checkEmailVerification, favController.getUserFavs)

module.exports = router;
