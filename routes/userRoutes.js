const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");
const checkAdmin = require("../middleware/checkAdmin");

router
  .get("/:verificationCode", userController.verifyUser)
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .post(
    "/",
    validateToken,
    checkEmailVerification,
    checkAdmin,
    userController.updateUserRoleAndStatus
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    checkAdmin,
    userController.deleteUserById
  );

module.exports = router;
