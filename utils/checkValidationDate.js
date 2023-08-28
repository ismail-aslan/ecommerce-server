const checkValidationDate = (user) => {
  const twoHoursBefore = new Date();
  twoHoursBefore.setHours(twoHoursBefore.getHours() - 2);
  if (user.userStatus === "active" && user.verificationDate > twoHoursBefore) {
    return true;
  }
  return false;
};
module.exports = checkValidationDate;
