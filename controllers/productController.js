const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const multiUpload = require("../utils/multiUpload");
const removeFile = require("../utils/removeFile");
const multer = require("multer");
const { Product, Category } = require("../models");

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    include: {
      model: Category,
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
  const products = await Product.findOne({
    where: { id },
    include: {
      model: Category,
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
  const {
    title,
    price,
    showDiscount = false,
    description,
    unitCount = 0,
    isListed = false,
  } = req.body;
  if (!title) {
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

    const result = await Product.create({
      title,
      price,
      showDiscount,
      images: images,
      description,
      unitCount,
      isListed,
    });

    res.status(201).send({
      status: "success",
      data: result,
    });
  });
});

exports.updateProductById = catchAsync(async (req, res, next) => {
  const {
    id,
    title,
    price,
    showDiscount,
    description,
    unitCount,
    isListed,
    categoryIds,
  } = req.body;

  if (id === undefined) {
    return next(new AppError("Missing or wrong parameters", 400));
  }

  const selectedProduct = await Product.findOne({
    where: { id },
  });

  if (!selectedProduct) {
    return next(new AppError("There isn't any product with that id.", 400));
  }
  if (title) {
    selectedProduct.title = title;
  }
  if (price !== undefined) {
    if (price !== selectedProduct.price) {
      selectedProduct.prevPrice = selectedProduct.price;
    }
    selectedProduct.price = price;
  }
  if (showDiscount !== undefined) {
    selectedProduct.showDiscount = showDiscount || false;
  }
  if (showDiscount !== undefined) {
    selectedProduct.showDiscount = showDiscount || false;
  }
  if (description !== undefined) {
    selectedProduct.description = description;
  }
  if (unitCount !== undefined) {
    selectedProduct.unitCount = unitCount || 0;
  }
  if (isListed !== undefined) {
    selectedProduct.unitCount = isListed || false;
  }

  let selectedCategories = [];

  if (categoryIds && categoryIds.length > 0) {
    selectedCategories = await Category.findAll({
      attributes: ["id", "name"],
      where: {
        id: categoryIds,
      },
    });
  }

  await selectedProduct.setCategories(selectedCategories);

  await selectedProduct.save();

  const result = await Product.findOne({
    where: { id },
    include: {
      model: Category,
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

  const selectedProduct = await Product.findOne({
    where: { id },
    include: {
      model: Category,
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

    const result = await Product.findOne({
      where: { id },
      include: {
        model: Category,
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

  const selectedProduct = await Product.findOne({
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

exports.listProductById = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const selectedProduct = await Product.findOne({
    where: { id },
    include: {
      model: Category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  const warnings = [];

  if (!selectedProduct.price) {
    return next(new AppError("Price can not be null or zero.", 400));
  }

  if (!selectedProduct.prevPrice && selectedProduct.showDiscount) {
    return next(
      new AppError(
        "Previous price can not be null or zero while showing discount.",
        400
      )
    );
  }

  if (selectedProduct.unitCount === null) {
    return next(
      new AppError("Product unit count is needed to list a product", 400)
    );
  }
  selectedProduct.isListed = true;
  selectedProduct.save();
  if (!selectedProduct.description) {
    warnings.push("No product description.");
  }

  if (selectedProduct.images.length === 0) {
    warnings.push("No product image uploaded.");
  }

  res.status(200).send({
    status: "success",
    data: warnings,
  });
});
exports.delistProductById = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  await Product.update(
    {
      isListed: false,
    },
    {
      where: { id },
    }
  );

  res.status(204).send({
    status: "success",
  });
});
