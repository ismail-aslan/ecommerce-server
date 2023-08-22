const generateError = require("./generateError");

module.exports = (message, statusCode) => {
  throw generateError(message, statusCode);
};
