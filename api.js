const api = require("express").Router();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

api.use("/users", userRoutes);
api.use("/products", productRoutes);

module.exports = api;
