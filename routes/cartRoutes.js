const express = require("express");
const router = express.Router();
const cartController = require("./../controllers/cartController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/", validateToken, checkEmailVerification, cartController.getUserCart)
  .get("/:id", validateToken, checkEmailVerification, cartController.addToCart)
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    cartController.removeFromCart
  );

module.exports = router;
