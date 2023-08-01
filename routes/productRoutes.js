const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById)
  .post(
    "/",
    validateToken,
    checkEmailVerification,
    productController.createProduct
  )
  .patch(
    "/",
    validateToken,
    checkEmailVerification,
    productController.updateProductById
  )
  .patch(
    "/:id/images",
    validateToken,
    checkEmailVerification,
    productController.updateProductImageById
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    productController.deleteProductById
  )
  .post(
    "/list",
    validateToken,
    checkEmailVerification,
    productController.listProductById
  )
  .post(
    "/delist",
    validateToken,
    checkEmailVerification,
    productController.delistProductById
  );

module.exports = router;
