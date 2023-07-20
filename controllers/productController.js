const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const product = require("../models/product");
const category = require("../models/category");
const multiUpload = require("../utils/multiUpload");
const removeFile = require("../utils/removeFile");
const multer = require("multer");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await product.findAll({
    include: {
      model: category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  res.status(200).send({
    status: "success",
    data: products,
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const products = await product.findOne({
    where: { id },
    include: {
      model: category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  res.status(200).send({
    status: "success",
    data: products,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, price, showDiscount = false, description } = req.body;
  if (!name) {
    return next(new AppError("Missing data", 400));
  }
  multiUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(new AppError(err.message, 500));
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        return next(new AppError(err.message, 413));
      } else {
        return next(new AppError(err.message, 500));
      }
    }

    const images = req.files?.map((f) => f.filename);

    const result = await product.create({
      name,
      price,
      showDiscount,
      images: images,
      description,
    });

    res.status(201).send({
      status: "success",
      data: result,
    });
  });
});

exports.updateProductById = catchAsync(async (req, res, next) => {
  const { id, name, price, showDiscount, description, categoryIds } = req.body;

  if (
    !name ||
    [price, showDiscount, description].every((el) => el == undefined)
  ) {
    return next(new AppError("Missing or wrong parameters", 400));
  }

  const selectedProduct = await product.findOne({
    where: { id },
    include: {
      model: category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  selectedProduct.name = name;
  selectedProduct.price = price;
  selectedProduct.showDiscount = showDiscount || false;
  selectedProduct.description = description;

  await selectedProduct.setCategories([]);

  if (categoryIds && categoryIds.length > 0) {
    const selectedCategories = await category.findAll({
      where: {
        id: categoryIds,
      },
    });

    await selectedProduct.setCategories(selectedCategories);
  }
  await selectedProduct.save();
  const result = await product.findOne({
    where: { id },
    include: {
      model: category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  res.status(200).send({
    status: "success",
    data: result,
  });
});

exports.updateProductImageById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id === undefined) {
    return next(new AppError("Missing or wrong parameters", 400));
  }

  const selectedProduct = await product.findOne({
    where: { id },
    include: {
      model: category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  if (!selectedProduct) {
    return next(new AppError("There isn't any product with that id.", 400));
  }

  multiUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(new AppError(err.message, 500));
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        return next(new AppError(err.message, 413));
      } else {
        return next(new AppError(err.message, 500));
      }
    }

    let { unchangedImgs = [] } = req.body;

    if (!Array.isArray(unchangedImgs) && unchangedImgs) {
      unchangedImgs = [unchangedImgs];
    }

    const images = [...req.files?.map((f) => f.filename)];
    const filteredUnchangedImgs = [];
    for (const imageLink of unchangedImgs) {
      const fileName = imageLink.split("/uploads/")[1];
      if (
        fileName &&
        (fileName.endsWith("png") ||
          fileName.endsWith("jpg") ||
          fileName.endsWith("jpeg")) &&
        selectedProduct.images.includes(imageLink)
      ) {
        images.unshift(fileName);
        filteredUnchangedImgs.push(imageLink);
      }
    }

    if (selectedProduct.images.length > 0) {
      for (const imageLink of selectedProduct.images) {
        if (filteredUnchangedImgs.includes(imageLink)) {
          continue;
        }
        const splitedLink = imageLink.split("/");
        await removeFile(splitedLink[splitedLink.length - 1]);
      }
    }
    selectedProduct.images = images;

    await selectedProduct.save();

    const result = await product.findOne({
      where: { id },
      include: {
        model: category,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });

    res.status(200).send({
      status: "success",
      data: result,
    });
  });
});

exports.deleteProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const selectedProduct = await product.findOne({
    where: { id },
  });

  if (selectedProduct.images.length > 0) {
    selectedProduct.images.forEach((imgLink) =>
      removeFile(imgLink.split("/uploads/")[1])
    );
  }

  await selectedProduct.destroy();

  res.status(204).send({
    status: "success",
  });
});
