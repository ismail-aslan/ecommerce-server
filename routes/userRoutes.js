const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/:verificationCode", userController.verifyUser)
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    userController.deleteUserById
  );

module.exports = router;
