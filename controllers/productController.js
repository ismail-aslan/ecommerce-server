const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getProducts = catchAsync(async (req, res, next) => {
  res.status(204).send({
    status: "success",
    data: null,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // if mail is already registered
  return next(new AppError("Db is not ok!", 400));
  // await Product.create(req.Product.id, { active: false });
  // res.status(204).send({
  //     status: 'success',
  //     data: null
  // });
});
