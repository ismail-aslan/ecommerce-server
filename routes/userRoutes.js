const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router
  .get("/:verificationCode", userController.verifyUser)
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .delete("/:id", userController.deleteUserById);

module.exports = router;
