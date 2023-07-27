const multer = require("multer");
const path = require("path");
const AppError = require("./appError");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.params.id +
        "_" +
        Math.floor(Math.random() * 1_000_000_000) +
        file.originalname.match(/\..*$/)[0]
    );
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (req.params.id === undefined) {
      cb(null, false);
      const err = new AppError("Id parameter is requiered!", 400);
      err.name = "ExtensionError";
      return cb(err);
    } else if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new AppError(
        `Only ${allowedFileTypes
          .map((el) => "." + el.split("image/")[0])
          .join(" or ")} format allowed!`,
        400
      );
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("productImage", 4);
