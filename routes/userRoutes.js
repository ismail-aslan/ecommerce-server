const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');


router
    .get("/", userController.getUsers)
    .get("/", userController.getUserById)
    .post("/", userController.createUser)
    .patch("/", userController.updateUserById)
    .delete("/", userController.deleteUserById)


module.exports = router;