const jwt = require("jsonwebtoken");

module.exports = (token) => {
  return jwt.verify(token, process.env.AUTH_REG_KEY);
};
