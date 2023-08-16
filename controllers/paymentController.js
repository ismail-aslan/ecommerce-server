const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const { Product, Order, Cart, User, OrderItem } = require("../models");
const { ecommercedb } = require("../models/db");

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
      return next(new AppError("Insufficient product", 400));
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
    return next(new AppError("No cart item"));
  }
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["TR", "DE", "US"],
    },
    line_items: lineItems,
    metadata: {
      cartIds: JSON.stringify(cartIds),
    },
    mode: "payment",
    expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // expires in 5 mins
    allow_promotion_codes: true,
    invoice_creation: {
      enabled: true,
    },
    success_url: `http://localhost:8000/?success=true`,
    cancel_url: `http://localhost:8000/?canceled=true`,
  });

  //   res.redirect(session.url);
  res.status(200).send({
    status: "success",
    data: session.url,
  });
});

exports.stripeWebhook = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.WEB_HOOK_SECRET
    );
  } catch (err) {
    console.log("err", err);
    return next(err);
  }
  let paymentIntent = null;
  try {
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session.
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items.data.price.product"],
        }
      );
      paymentIntent = session.payment_intent;

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
              throw new Error("Product out of stock");
            }

            product.unitCount -= cartItem.quantity;
            product.soldCount += cartItem.quantity;
            await product.save({ transaction: t });
          }

          // Create order and associate cart items
          await Order.create(
            {
              shippingDetails: session.shipping_details,
              contactName: session.customer_details.name,
              contactEmail: session.customer_details.email,
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
        res
          .status(200)
          .send({
            status: "success",
            data: "Payment successful",
          })
          .end();
      } else {
        return next(new AppError("Payment not successful", 400));
      }
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

      return next(new AppError("Product out of stock", 400));
    }
    return next(error);
  }
});
