const AppError = require("../utils/appError");
const checkValidationDate = require("../utils/checkValidationDate");

module.exports = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new AppError("This middleware must be used after token validation", 500)
    );
  }
  if (!(user.userRole === "admin" || user.userRole === "employee")) {
    if (checkValidationDate(user)) {
      return next();
    }
    return next(new AppError("You are not alowed to do that!", 401));
  }
  next();
};
