const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");

router
  .get("/", categoryController.getCategorys)
  .get("/:id", categoryController.getCategoryById)
  .post("/", categoryController.createCategory)
  .patch("/", categoryController.updateCategoryById)
  .delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
