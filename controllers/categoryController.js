const { Category } = require("../models");
const catchAsync = require("./../utils/catchAsync");
const throwError = require("./../utils/throwError");

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll();
  res.status(200).send({
    status: "success",
    data: categories,
  });
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: { id },
  });
  res.status(200).send({
    status: "success",
    data: category,
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    throwError("Category name is required.", 400);
  }
  const createdCategory = await Category.create({ name });
  res.status(201).send({
    status: "success",
    data: createdCategory,
  });
});

exports.updateCategoryById = catchAsync(async (req, res, next) => {
  const { id, name } = req.body;

  const [updatedCount, updatedCategory] = await Category.update(
    { name },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );

  if (updatedCount === 0) {
    throwError("Category not found or wrong parameters.", 400);
  }
  res.status(200).send({
    status: "success",
    data: updatedCategory,
  });
});

exports.deleteCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await Category.destroy({
    where: { id },
  });

  res.status(204).send({
    status: "success",
  });
});
