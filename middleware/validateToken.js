const AppError = require("../utils/appError");
const { User } = require("../models");
const verifyToken = require("../utils/verifyToken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("Missing token", 401));
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
      return next(new AppError("Invalid token", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};
