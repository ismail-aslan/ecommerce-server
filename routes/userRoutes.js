const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router
  .get("/:verificationCode", userController.verifyUser)
  .post("/register", userController.createUser)
  .delete("/:id", userController.deleteUserById);

module.exports = router;
