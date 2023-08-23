const { ORDER_STATUS, VALID_LIMIT_VALUES } = require("../constants");
const { Order, OrderItem, Product } = require("../models");
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

  if (status && !ORDER_STATUS.includes(status)) {
    throwError(
      `Invalid or unsupported order status. Allowed values: ${ORDER_STATUS.join(
        ", "
      )}.`,
      400
    );
  }

  if (order_by && !["id", "user", "USER"].includes(order_by)) {
    throwError(`Invalid 'order_by' query parameter.`, 400);
  }
  if (!VALID_LIMIT_VALUES.includes(limit)) {
    throwError(`Invalid 'limit' query parameter.`, 400);
  }
  if (
    !(
      typeof offset === "number" ||
      (typeof offset === "string" && /^-?\d+$/.test(offset))
    )
  ) {
    throwError(`Invalid 'offset' query parameter.`, 400);
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

  if (!order || order.length === 0) {
    throwError(`Order with ID ${id} not found.`, 404);
  }

  res.status(200).send({
    status: "success",
    data: order,
  });
});

exports.updateOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;

  if (!status || !ORDER_STATUS.includes(status)) {
    throwError("Invalid or unsupported status value.", 400);
  }
  const order = await Order.update(
    { status },
    {
      where: { id },
    }
  );

  if (!order || order[0] === 0) {
    throwError(`Order with ID ${id} not found.`, 404);
  }

  res.status(200).send({
    status: "success",
    data: order[0],
  });
});
