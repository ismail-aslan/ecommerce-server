const fs = require("fs");

// const __dirname = fs.realpathSync(".");
module.exports = async (fileName) => {
  const directoryPath = __basedir + "/public/uploads/";
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      throw err;
    }
  });
};
