"use strict";
const catchAsync = require("./../utils/catchAsync");
const { Product, Order, Cart, User, OrderItem } = require("../models");
const { ecommercedb } = require("../models/db");
const throwError = require("../utils/throwError");
const { ALLOWED_COUNTRIES } = require("../constants");

const createStripeCheckoutSession = async (lineItems, cartIds) => {
  const expirationTime = 60 * 30; // expires in 5 mins
  return await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ALLOWED_COUNTRIES,
    },
    line_items: lineItems,
    metadata: {
      cartIds: JSON.stringify(cartIds),
    },
    mode: "payment",
    expires_at: Math.floor(Date.now() / 1000) + expirationTime,
    allow_promotion_codes: true,
    invoice_creation: {
      enabled: true,
    },
    success_url: `${process.env.CLIENT_BASE_URL}?success=true`,
    cancel_url: `${process.env.CLIENT_BASE_URL}?canceled=true`,
  });
};

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const user = req.user;

  const userWithCart = await User.findOne({
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
  const lineItems = [];
  const cartIds = [];
  for (const cart of userWithCart.carts) {
    const product = cart.product;
    if (product.unitCount < cart.quantity) {
      throwError("Insufficient product", 400);
    }
    lineItems.push({
      price: product.stripePriceId,
      quantity: cart.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: product.unitCount,
      },
    });
    cartIds.push(cart.id);
  }
  if (lineItems.length === 0) {
    throwError("No cart item");
  }
  const session = await createStripeCheckoutSession(lineItems, cartIds);

  //   res.redirect(session.url);
  res.status(200).send({
    status: "success",
    data: session.url,
  });
});

const retrieveSession = async (event) => {
  return await stripe.checkout.sessions.retrieve(event.data.object.id, {
    expand: ["line_items.data.price.product"],
  });
};
const handleCheckoutSessionCompleted = async (session) => {
  if (session.payment_status === "paid") {
    const cartItems = await Cart.findAll({
      where: { id: JSON.parse(session.metadata.cartIds) },
      include: { model: Product },
    });

    await ecommercedb.transaction(async (t) => {
      // Check product availability and deduct available quantity
      for (const cartItem of cartItems) {
        const product = cartItem.product;

        if (product.unitCount < cartItem.quantity) {
          throwError("Product out of stock", 400);
        }

        product.unitCount -= cartItem.quantity;
        product.soldCount += cartItem.quantity;
        await product.save({ transaction: t });
      }

      // Create order and associate cart items
      await Order.create(
        {
          shippingDetails: session.shipping_details,
          recieverName: session.shipping_details.name,
          addressLine1: session.shipping_details.address.line1,
          addressLine2: session.shipping_details.address.line2,
          city: session.shipping_details.address.city,
          state: session.shipping_details.address.state,
          country: session.shipping_details.address.country,
          postalCode: session.shipping_details.address.postal_code,
          userId: cartItems[0].userId,
          orderItems: session.line_items.data.map((item) => ({
            price: item.price.unit_amount / 100,
            quantity: item.quantity,
            productId: item.price.product.metadata.productId,
          })),
        },
        { include: [OrderItem], transaction: t }
      );

      // Clear cart after successful payment
      await Cart.destroy({
        where: { id: JSON.parse(session.metadata.cartIds) },
        transaction: t,
      });
    });
  } else {
    throwError("Payment not successful", 400);
  }
};
exports.stripeWebhook = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event;

  event = await stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.WEB_HOOK_SECRET
  );

  let paymentIntent = null;
  try {
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session.
      const session = await retrieveSession(event);
      paymentIntent = session.payment_intent;
      await handleCheckoutSessionCompleted(session);
      res
        .status(200)
        .send({
          status: "success",
          data: "Payment successful",
        })
        .end();
    } else {
      res.end();
    }
  } catch (error) {
    console.error("Error processing payment:", error);

    // Handle out-of-stock scenario and initiate refund
    if (error.message === "Product out of stock") {
      // Initiate a refund for the payment

      await stripe.refunds.create({
        payment_intent: paymentIntent,
      });

      throwError("Product out of stock", 400);
    }
    return next(error);
  }
});
