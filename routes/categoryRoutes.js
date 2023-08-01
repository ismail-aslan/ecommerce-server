const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");
const validateToken = require("../middleware/validateToken");

router
  .get("/", categoryController.getCategorys)
  .get("/:id", categoryController.getCategoryById)
  .post("/", validateToken, categoryController.createCategory)
  .patch("/", validateToken, categoryController.updateCategoryById)
  .delete("/:id", validateToken, categoryController.deleteCategoryById);

module.exports = router;
