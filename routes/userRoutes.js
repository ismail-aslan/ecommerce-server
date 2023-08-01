const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const validateToken = require("../middleware/validateToken");

router
  .get("/:verificationCode", userController.verifyUser)
  .post("/register", userController.createUser)
  .post("/login", userController.login)
  .delete("/:id", validateToken, userController.deleteUserById);

module.exports = router;
