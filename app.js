// built in Nodemodules
const path = require("path");
// libraries and frameworks
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const api = require("./api");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");

global.stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
global.__basedir = __dirname;

app.use(cors());

// Use JSON parser for all non-stripe-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/api/v1/payment/process-payment") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
// to parse the incoming requests in urlencodedform
app.use(express.urlencoded({ extended: true }));
// to serve the static files
app.use(express.static(path.join(__dirname, "public")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// redirect incoming requests to api.js
app.use("/api/v1", api);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));
app.get("/uploads", express.static("./public"));
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
