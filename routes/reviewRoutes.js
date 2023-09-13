const express = require("express");
const router = express.Router();
const reviewController = require("./../controllers/reviewController");
const validateToken = require("../middleware/validateToken");
const checkEmailVerification = require("../middleware/checkEmailVerification");

router
  .get("/:productId", reviewController.getProductReviews)
  .get(
    "/can_add_review/:productId",
    validateToken,
    checkEmailVerification,
    reviewController.canAddReview
  )
  .post(
    "/:productId",
    validateToken,
    checkEmailVerification,
    reviewController.createProductReview
  )
  .post(
    "/vote/:id",
    validateToken,
    checkEmailVerification,
    reviewController.voteProductReview
  )
  .patch(
    "/:id",
    validateToken,
    checkEmailVerification,
    reviewController.updateProductReview
  )
  .delete(
    "/:id",
    validateToken,
    checkEmailVerification,
    reviewController.deleteProductReview
  )
  .delete(
    "/vote/:id",
    validateToken,
    checkEmailVerification,
    reviewController.deleteProductReviewVote
  );

module.exports = router;
