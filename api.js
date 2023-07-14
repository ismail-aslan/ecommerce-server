const api = require("express").Router();
const userRoutes = require("./routes/userRoutes");


api.use('/users', userRoutes);


module.exports = api;