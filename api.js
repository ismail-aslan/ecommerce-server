const api = require("express").Router();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favRoutes = require("./routes/favRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

api.use("/users", userRoutes);
api.use("/products", productRoutes);
api.use("/categories", categoryRoutes);
api.use("/favs", favRoutes);
api.use("/cart", cartRoutes);
api.use("/payment", paymentRoutes);
api.use("/orders", orderRoutes);

module.exports = api;
