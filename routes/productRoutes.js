const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");

router
  //   .get("/", productController.getProducts)
  //   .get("/", productController.getProductById)
  .post("/", productController.createProduct);
//   .patch("/", productController.updateProductById)
//   .delete("/", productController.deleteProductById);

module.exports = router;
