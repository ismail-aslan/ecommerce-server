const {
  Product,
  User,
  Review,
  Order,
  OrderItem,
  ReviewVote,
} = require("../models");
const catchAsync = require("./../utils/catchAsync");
const checkType = require("../utils/checkType");
const throwError = require("../utils/throwError");
const { REVIEW_RATINGS, VALID_LIMIT_VALUES } = require("../constants");
const { ecommercedb } = require("../models/db");

const checkIfUserOrderedProduct = async (productId, userId) => {
  const orders = await Order.findAll({
    include: [
      {
        model: User,
        where: {
          id: userId,
        },
      },
      {
        model: OrderItem,
        required: true,
        include: [
          {
            model: Product,
            where: {
              id: productId,
            },
          },
        ],
      },
    ],
  });

  return orders && orders.length > 0;
};

exports.getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { limit = "20", offset = "0" } = req.query;

  checkType(productId, "number", false);

  if (!VALID_LIMIT_VALUES.includes(limit)) {
    throwError(`Invalid limit query`, 400);
  }

  if (
    !(
      typeof offset === "number" ||
      (typeof offset === "string" && /^-?\d+$/.test(offset))
    )
  ) {
    throwError(`Invalid offset query`, 400);
  }

  const reviews = await Review.findAndCountAll({
    where: {
      productId,
    },
    attributes: {
      include: [
        [
          ecommercedb.literal(
            `(SELECT COUNT(*) FROM "reviewVote" WHERE "review_id" = "review"."id" AND "is_like" = true)`
          ),
          "likeCount",
        ],
        [
          ecommercedb.literal(
            `(SELECT COUNT(*) FROM "reviewVote" WHERE "review_id" = "review"."id" AND "is_like" = false)`
          ),
          "dislikeCount",
        ],
      ],
    },
    limit,
    offset,
  });

  res.status(200).send({
    status: "success",
    data: {
      reviews: reviews.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: reviews.count,
      },
    },
  });
});

exports.canAddReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { user } = req;

  checkType(productId, "number", false);

  const isUserOrderedProduct = await checkIfUserOrderedProduct(
    productId,
    user.id
  );

  res.status(200).send({
    status: "success",
    data: isUserOrderedProduct,
  });
});

exports.createProductReview = catchAsync(async (req, res) => {
  const { user } = req;
  const { productId } = req.params;
  const { rating, content, showFullName } = req.body;

  checkType(productId, "number", false);
  checkType(rating, "number", false);
  checkType(content, "string", true);
  checkType(showFullName, "boolean", false);

  const isUserOrderedProduct = await checkIfUserOrderedProduct(
    productId,
    user.id
  );

  if (!isUserOrderedProduct) {
    throwError("You can only add reviews to products you have purchased", 400);
  }

  if (REVIEW_RATINGS.includes(rating) === false) {
    throwError("Rating must be between 1 and 5", 400);
  }

  const displayName = user.name + " " + user.surname;

  const review = await Review.create({
    showFullName,
    displayName,
    rating,
    content,
    productId,
    userId: user.id,
  });

  res.status(200).send({
    status: "success",
    data: review,
  });
});

exports.voteProductReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { isLike } = req.body;

  checkType(id, "string", false);
  checkType(isLike, "boolean", false);

  const existingReviewVote = await ReviewVote.findOne({
    where: {
      userId: user.id,
      reviewId: id,
    },
  });

  if (!existingReviewVote) {
    await ReviewVote.create({
      userId: user.id,
      reviewId: id,
      isLike,
    });

    return res.status(200).send({
      status: "success",
    });
  }

  if (existingReviewVote.isLike === isLike) {
    throwError("You can't vote twice", 400);
  }

  existingReviewVote.isLike = isLike;

  await existingReviewVote.save();

  res.status(200).send({
    status: "success",
  });
});

exports.updateProductReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { rating, content, showFullName } = req.body;

  const selectedReview = await Review.findByPk(id, {
    include: {
      model: User,
      attributes: ["id"],
    },
  });

  if (!selectedReview) {
    throwError("Review not found", 404);
  }

  if (selectedReview.userId !== user.id) {
    throwError("You can only edit your own reviews", 401);
  }

  if (!rating && !content && !showFullName) {
    throwError("You must provide at least one field to update", 400);
  }

  if (rating) {
    checkType(rating, "number", false);
    selectedReview.rating = rating;
  }

  if (content) {
    checkType(content, "string", true);
    selectedReview.content = content;
  }

  if (showFullName !== undefined) {
    checkType(showFullName, "boolean", false);
    selectedReview.showFullName = showFullName;
  }

  await selectedReview.save();

  res.status(200).send({
    status: "success",
    data: selectedReview,
  });
});

exports.deleteProductReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const isAdmin = user?.userRole === "admin";

  const selectedReview = await Review.findByPk(id, {
    include: {
      model: User,
      attributes: ["id"],
    },
  });

  if (!selectedReview) {
    throwError("Review not found", 404);
  }

  if (selectedReview.userId !== user.id && !isAdmin) {
    throwError("You can only delete your own reviews", 401);
  }

  await selectedReview.destroy();

  res.status(200).send({
    status: "success",
  });
});

exports.deleteProductReviewVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  checkType(id, "string", false);

  const existingReviewVote = await ReviewVote.findOne({
    where: {
      userId: user.id,
      reviewId: id,
    },
  });

  if (!existingReviewVote) {
    throwError("Review vote not found", 404);
  }

  await existingReviewVote.destroy();

  res.status(200).send({
    status: "success",
  });
});
