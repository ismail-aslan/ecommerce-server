const AppError = require("./appError");

const checkType = (data, dataType, nullable) => {
  const generateError = () => {
    return new AppError(
      `Expected ${dataType} value but recieved ${typeof data}`,
      400
    );
  };
  if (typeof data === "string") {
    data = data.trim();
  }
  if (!nullable && (data === undefined || data === null || data === "")) {
    throw new AppError("Missing parameters", 400);
  } else if (nullable && (data === undefined || data === null)) {
    return;
  }
  if (dataType === "string" && typeof data !== "string") {
    throw generateError();
  } else if (
    dataType === "number" &&
    !(
      typeof data === "number" ||
      (typeof data === "string" && /^-?\d+$/.test(data))
    )
  ) {
    throw generateError();
  } else if (dataType === "boolean" && typeof data !== "boolean") {
    throw generateError();
  } else if (dataType === "array" && !Array.isArray(data)) {
    throw generateError();
  }
};

module.exports = checkType;
