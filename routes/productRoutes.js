const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const validateToken = require("../middleware/validateToken");

router
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById)
  .post("/", validateToken, productController.createProduct)
  .patch("/", validateToken, productController.updateProductById)
  .patch("/:id/images", validateToken, productController.updateProductImageById)
  .delete("/:id", validateToken, productController.deleteProductById)
  .post("/list", validateToken, productController.listProductById)
  .post("/delist", validateToken, productController.delistProductById);

module.exports = router;
