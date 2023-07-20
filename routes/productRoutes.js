const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");

router
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById)
  .post("/", productController.createProduct)
  .patch("/", productController.updateProductById)
  .patch("/:id/images", productController.updateProductImageById)
  .delete("/:id", productController.deleteProductById);

module.exports = router;
