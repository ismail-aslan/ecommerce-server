const api = require("express").Router();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const favRoutes = require("./routes/favRoutes");

api.use("/users", userRoutes);
api.use("/products", productRoutes);
api.use("/categories", categoryRoutes);
api.use("/favs", favRoutes);

module.exports = api;
