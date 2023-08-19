const express = require("express");
const router = express.Router();
const orderController = require("./../controllers/orderController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");
const checkAdmin = require("../middleware/checkAdmin");

router
  .get(
    "/",
    validateToken,
    checkEmailVerification,
    checkAdmin,
    orderController.getOrders
  )
  .get(
    "/:id",
    validateToken,
    checkEmailVerification,
    checkAdmin,
    orderController.getOrderById
  )
  .patch(
    "/:id",
    validateToken,
    checkEmailVerification,
    checkAdmin,
    orderController.updateOrderById
  );

module.exports = router;
