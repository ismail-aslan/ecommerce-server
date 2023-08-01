const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/", categoryController.getCategorys)
  .get("/:id", categoryController.getCategoryById)
  .post(
    "/",
    validateToken,
    checkEmailVerification,
    categoryController.createCategory
  )
  .patch(
    "/",
    validateToken,
    checkEmailVerification,
    categoryController.updateCategoryById
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    categoryController.deleteCategoryById
  );

module.exports = router;
