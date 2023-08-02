const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const category = require("../models/category");
const { Product } = require("../models");

exports.addFav = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const product = await Product.findOne({
    where: { id },
  });
  const result = await user.addFavorite(product);
  res.status(200).send({
    status: "success",
    data: result ? result?.length : 0,
  });
});

exports.removeFav = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const product = await Product.findOne({
    where: { id },
  });
  const result = await user.removeFavorite(product);
  res.status(200).send({
    status: "success",
    data: result,
  });
});
