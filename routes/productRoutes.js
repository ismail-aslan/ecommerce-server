const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");
const checkEmployee = require("../middleware/checkEmployee");

router
  .get("/", productController.getProducts)
  .get("/:id", productController.getProductById)
  .post(
    "/",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.createProduct
  )
  .patch(
    "/",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.updateProductById
  )
  .patch(
    "/:id/images",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.updateProductImageById
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.deleteProductById
  )
  .post(
    "/list",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.listProductById
  )
  .post(
    "/delist",
    validateToken,
    checkEmailVerification,
    checkEmployee,
    productController.delistProductById
  );

module.exports = router;
