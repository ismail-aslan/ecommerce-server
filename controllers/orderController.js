const catchAsync = require("./../utils/catchAsync");

exports.getOrders = catchAsync(async (req, res, next) => {
  const user = req.user;

  res.status(200).send({
    status: "success",
    // data: result ? result?.length : 0,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  res.status(200).send({
    status: "success",
    // data: result ? result?.length : 0,
  });
});
