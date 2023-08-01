const AppError = require("../utils/appError");

module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new AppError("This middleware must be used after token validation", 500)
    );
  }
  if (user.userStatus === "pending") {
    new AppError("User email is not verified", 401);
  }
  next();
};
