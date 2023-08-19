const { ORDER_STATUS } = require("../constants");
const { Order, OrderItem, Product } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getOrders = catchAsync(async (req, res, next) => {
  const {
    country,
    status,
    order_by,
    desc = true,
    limit = "20",
    offset = "0",
  } = req.query;
  console.log("limit", limit);
  if (status && !ORDER_STATUS.includes(status)) {
    return next(
      new AppError(
        `Order status can only be  ${ORDER_STATUS.join(" or ")}`,
        400
      )
    );
  }

  if (order_by && !["id", "user", "USER"].includes(order_by)) {
    return next(new AppError(`Invalid order_by query`, 400));
  }
  if (!["1", "2", "10", "20", "30"].includes(limit)) {
    return next(new AppError(`Invalid limit query`, 400));
  }
  if (
    !(
      typeof offset === "number" ||
      (typeof offset === "string" && /^-?\d+$/.test(offset))
    )
  ) {
    return next(new AppError(`Invalid offset query`, 400));
  }
  const queryObj = {};

  if (status) {
    queryObj.where = { status };
  }

  if (country) {
    queryObj.where = { ...queryObj.where, country };
  }

  if (order_by) {
    queryObj.order = [[order_by, desc ? "DESC" : "ASC"]];
  }

  queryObj.limit = limit;
  queryObj.offset = offset;

  const orders = await Order.findAndCountAll(queryObj);

  res.status(200).send({
    status: "success",
    data: { count: orders.count, orders: orders.rows },
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findAll({
    where: { id },
    include: [
      {
        model: OrderItem,
        attributes: ["quantity"],
        include: [
          {
            model: Product,
            attributes: ["id", "title", "images"],
          },
        ],
      },
    ],
  });

  res.status(200).send({
    status: "success",
    data: order,
  });
});

exports.updateOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;

  if (!status || !ORDER_STATUS.includes(status)) {
    return next(new AppError("Invalid status", 400));
  }
  const order = await Order.update(
    { status },
    {
      where: { id },
    }
  );

  res.status(200).send({
    status: "success",
    data: order[0],
  });
});
