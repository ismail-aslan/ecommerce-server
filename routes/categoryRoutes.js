const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");
const checkEmployee = require("../middleware/checkEmployee");

router
  .get("/", categoryController.getCategories)
  .get("/:id", categoryController.getCategoryById)
  .post(
    "/",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    categoryController.createCategory
  )
  .patch(
    "/",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    categoryController.updateCategoryById
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    categoryController.deleteCategoryById
  );

module.exports = router;
