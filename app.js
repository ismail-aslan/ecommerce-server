// built in Nodemodules
const path = require("path");
// libraries and frameworks
const express = require("express");
const app = express();
const morgan = require("morgan");
const api = require("./api");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs");
const { ecommercedb } = require("./models/index");

// connect and sync db
ecommercedb
  .sync({ force: true })
  .then(() => console.log("synced ecommercedb successfully!"))
  .catch((err) => console.log("unable to sync ecommercedb!", err));

ecommercedb
  .authenticate()
  .then(() => console.log("connected ecommercedb successfully!"))
  .catch((err) => console.log("unable to connect ecommercedb!", err));

// to parse the incoming requests with JSON payloads
app.use(express.json());
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
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
