const generateError = require("./generateError");

const throwError = (message, statusCode) => {
  throw generateError(message, statusCode);
};
module.exports = throwError;
