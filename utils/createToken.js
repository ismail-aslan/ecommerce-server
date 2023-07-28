const jwt = require("jsonwebtoken");

module.exports = (data, options = {}) => {
  return jwt.sign(data, process.env.AUTH_REG_KEY, options);
};
