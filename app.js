// built in Nodemodules
const path = require("path");
// libraries and frameworks
const express = require("express");
const app = express();
const morgan = require("morgan");
const api = require("./api");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const { sampledb } = require("./models/index");

// connect and sync db
sampledb.sync({ force: false })
    .then(() => console.log("synced sampledb successfully!"))
    .catch(err => console.log("unable to sync sampledb!", err));

sampledb.authenticate()
    .then(() => console.log("connected sampledb successfully!"))
    .catch(err => console.log("unable to connect sampledb!", err));

// to parse the incoming requests with JSON payloads
app.use(express.json());
// to parse the incoming requests in urlencodedform
app.use(express.urlencoded({ extended: true }));
// to serve the static files
app.use(express.static(path.join(__dirname, "public")));

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

// redirect incoming requests to api.js
app.use("/api/v1", api);

app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;