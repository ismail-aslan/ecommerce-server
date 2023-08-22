const AppError = require("./appError");

module.exports = (message, statusCode) => new AppError(message, statusCode);
