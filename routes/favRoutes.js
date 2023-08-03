const express = require("express");
const router = express.Router();
const favController = require("./../controllers/favController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/", validateToken, checkEmailVerification, favController.getUserFavs)
  .get("/:id", validateToken, checkEmailVerification, favController.addFav)
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    favController.removeFav
  );

module.exports = router;
