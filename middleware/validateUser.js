const AppError = require("../utils/appError");
const { User } = require("../models");
const verifyToken = require("../utils/verifyToken");

module.exports = async (req, res, next) => {
  req.user = null;
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];
  if (!token) {
    return next();
  }
  try {
    const verification = verifyToken(token);
    const { email } = verification;
    const user = await User.findOne({
      where: {
        token,
        email,
      },
    });
    if (user === null) {
      return next();
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return next();
    }
    return next();
  }
};
