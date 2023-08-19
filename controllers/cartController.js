const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { Product, User, Cart } = require("../models");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const product = await Product.findOne({
    where: { id },
  });
  if (!product) {
    return next(new AppError("Invalid product id", 400));
  } else if (!product.isListed) {
    return next(new AppError("This product is not listed", 400));
  }

  let result = [];
  if (await user.hasProduct(product)) {
    result = await Cart.increment(
      {
        quantity: 1,
      },
      {
        where: {
          user_id: user.id,
          product_id: id,
        },
      }
    );
  } else {
    result = await user.addProduct(product, {
      through: { price: product.price, quantity: 1 },
    });
  }
  res.status(200).send({
    status: "success",
    data: result ? result?.length : 0,
  });
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  const product = await Product.findOne({
    where: { id },
  });
  if (!product) {
    return next(new AppError("Invalid product id", 400));
  }
  const cartItem = await Cart.findOne({
    where: {
      user_id: user.id,
      product_id: product.id,
    },
  });
  if (!cartItem) {
    return next(new AppError("This product is not in your cart", 400));
  } else if (cartItem.quantity === 1) {
    cartItem.destroy();
    res.status(200).send({
      status: "success",
      data: [],
    });
  } else {
    cartItem.quantity = cartItem.quantity - 1;
    cartItem.save();
    res.status(200).send({
      status: "success",
      data: cartItem,
    });
  }
});

exports.getUserCart = catchAsync(async (req, res, next) => {
  const user = req.user;

  const result = await User.findOne({
    where: { id: user.id },
    attributes: [],
    include: {
      model: Cart,
      include: {
        model: Product,
        where: {
          isListed: true,
        },
      },
    },
  });
  res.status(200).send({
    status: "success",
    data: result,
  });
});
