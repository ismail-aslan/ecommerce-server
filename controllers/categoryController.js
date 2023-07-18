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

exports.updateCategoryById = catchAsync(async (req, res, next) => {
  const { id, name } = req.body;

  const categories = await category.update(
    { name },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );

  if (categories[0] === 0) {
    return next(new AppError("Missing or wrong parameters", 400));
  }
  res.status(200).send({
    status: "success",
    data: categories,
  });
});

exports.deleteCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await category.destroy({
    where: { id },
  });

  res.status(204).send({
    status: "success",
  });
});
