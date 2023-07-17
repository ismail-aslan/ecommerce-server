const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const category = require("../models/category");

exports.getCategorys = catchAsync(async (req, res, next) => {
  const categories = await category.findAll();
  res.status(200).send({
    status: "success",
    data: categories,
  });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;
  const categories = await category.findOne({
    where: { id },
  });
  res.status(200).send({
    status: "success",
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  console.log("regqbody", req.body);
  const { name } = req.body;
  if (!name) {
    return next(new AppError("Missing data", 400));
  }
  const result = await category.create({ name });
  res.status(201).send({
    status: "success",
    data: result,
  });
});
