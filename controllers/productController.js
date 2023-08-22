const multer = require("multer");
const { Op } = require("sequelize");
const { ecommercedb } = require("../models/db");
const { Product, Category, User } = require("../models");
const catchAsync = require("./../utils/catchAsync");
const multiUpload = require("../utils/multiUpload");
const removeFile = require("../utils/removeFile");
const checkType = require("../utils/checkType");
const throwError = require("../utils/throwError");

const createCategoryQuery = async (category) => {
  let categoryQuery = {};
  if (category) {
    const categories = await Category.findAll({
      where: {
        name: category,
      },
      attributes: ["id"],
      raw: true,
    });

    if (categories.length > 0) {
      categoryQuery = {
        where: {
          id: categories.map((el) => el.id),
        },
      };
    }
  }
  return categoryQuery;
};

const createProductTextSearchQuery = async (search) => {
  if (!search) {
    return {};
  } else if (Array.isArray(search)) {
    search = search.map((el) => el.split(" ")).flat();
  } else {
    search = search.split(" ");
  }
  return {
    [Op.or]: search
      .map((el) => [
        ecommercedb.where(
          ecommercedb.fn("LOWER", ecommercedb.col("title")),
          "LIKE",
          "%" + el.toLowerCase() + "%"
        ),
        ecommercedb.where(
          ecommercedb.fn("LOWER", ecommercedb.col("description")),
          "LIKE",
          "%" + el.toLowerCase() + "%"
        ),
      ])
      .flat(),
  };
};

exports.getProducts = catchAsync(async (req, res, next) => {
  const isAdmin = req.user?.userRole === "admin";

  const { search, category, isListed, limit = "20", offset = "0" } = req.query;

  if (!["1", "2", "10", "20", "30"].includes(limit)) {
    throwError(`Invalid limit query`, 400);
  }

  if (
    !(
      typeof offset === "number" ||
      (typeof offset === "string" && /^-?\d+$/.test(offset))
    )
  ) {
    throwError(`Invalid offset query`, 400);
  }

  let categoryQuery = await createCategoryQuery(category);
  const productSearchQuery = await createProductTextSearchQuery(search);

  let productQuery = { ...productSearchQuery };
  if (!isAdmin) {
    productQuery.isListed = true;
  } else if (isListed !== undefined) {
    productQuery.isListed = Boolean(isListed);
  }

  const products = await Product.findAndCountAll({
    where: {
      ...productQuery,
    },
    order: [["id", "DESC"]],
    include: {
      model: Category,
      ...categoryQuery,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
    distinct: true,
    limit,
    offset,
  });

  res.status(200).send({
    status: "success",
    data: { count: products.count, products: products.rows },
  });
});

exports.getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  checkType(id, "number", false);
  const product = await Product.findByPk(id, {
    attributes: {
      include: [
        [ecommercedb.fn("COUNT", ecommercedb.col("favorite.id")), "favCount"],
      ],
    },
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        as: "favorite",
        attributes: [],
        through: {
          attributes: [],
        },
      },
    ],
    group: ["product.id", "categories.id"],
  });

  res.status(200).send({
    status: "success",
    data: product,
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
    categoryIds,
  } = req.body;

  checkType(title, "string", false);
  checkType(price, "number", true);
  checkType(showDiscount, "boolean", true);
  checkType(description, "string", true);
  checkType(unitCount, "number", true);
  checkType(isListed, "boolean", true);
  checkType(categoryIds, "array", true);

  const stripeProduct = await stripe.products.create({
    active: isListed,
    name: title,
    description: description,
    // images: [image],
  });
  let stripePrice = null;
  if (price) {
    stripePrice = await stripe.prices.create({
      unit_amount: parseInt(price * 100), // Convert price to cents
      currency: "eur",
      product: stripeProduct.id,
    });
  }

  const product = await Product.create({
    title,
    price,
    showDiscount,
    description,
    unitCount,
    isListed,
    stripeProductId: stripeProduct.id,
    stripePriceId: stripePrice?.id,
  });

  let selectedCategories = [];

  if (categoryIds && categoryIds.length > 0) {
    selectedCategories = await Category.findAll({
      attributes: ["id", "name"],
      where: {
        id: categoryIds,
      },
    });
  }

  await product.setCategories(selectedCategories);

  await product.save();

  await stripe.products.update(stripeProduct.id, {
    metadata: {
      productId: product.id,
    },
  });
  const result = await Product.findOne({
    where: { id: product.id },
    include: {
      model: Category,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });

  res.status(201).send({
    status: "success",
    data: result,
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
  checkType(id, "number", false);
  checkType(title, "string", true);
  checkType(price, "number", true);
  checkType(showDiscount, "boolean", true);
  checkType(description, "string", true);
  checkType(unitCount, "number", true);
  checkType(isListed, "boolean", true);
  checkType(categoryIds, "array", true);

  const selectedProduct = await Product.findOne({
    where: { id },
  });

  if (!selectedProduct) {
    throwError("There isn't any product with that id.", 400);
  }
  //#region stripe update
  // Update Stripe product if necessary
  if (
    (title !== undefined && selectedProduct.title !== title) ||
    (description !== undefined &&
      selectedProduct.description !== description) ||
    (isListed !== undefined && selectedProduct.isListed !== isListed)
  ) {
    await stripe.products.update(selectedProduct.stripeProductId, {
      name: title !== undefined ? title : selectedProduct.title,
      description:
        description !== undefined ? description : selectedProduct.description,
      active: isListed !== undefined ? isListed : selectedProduct.isListed,
    });
  }
  if (price !== undefined && price !== selectedProduct.price) {
    if (price) {
      await stripe.prices.update(selectedProduct.stripePriceId, {
        active: false,
      });
      const stripePrice = await stripe.prices.create({
        unit_amount: parseInt(price * 100), // Convert price to cents
        currency: "eur",
        product: selectedProduct.stripeProductId,
      });
      selectedProduct.stripePriceId = stripePrice.id;
    } else {
      await stripe.prices.update(selectedProduct.stripePriceId, {
        active: false,
      });
      selectedProduct.stripePriceId = null;
    }
  }
  //#endregion stripe update

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
    selectedProduct.isListed = isListed || false;
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
  checkType(id, "number", false);

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
    throwError("There isn't any product with that id.", 400);
  }

  multiUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      throwError(err.message, 500);
    } else if (err?.message === "Unexpected end of form") {
      throwError(err.message, 400);
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        throwError(err.message, 413);
      } else {
        throwError(err.message, 500);
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
        fileName.startsWith(process.env.BASE_URL) &&
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
    await stripe.products.update(selectedProduct.stripeProductId, {
      //! TODO
      // images: images.map((el) => `${process.env.BASE_URL}uploads/${el}`),
      images: images.map(
        (_, idx) =>
          [
            `https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png`,
            `https://unctad.org/sites/default/files/inline-images/ccpb_workinggroup_productsafety_800x450.jpg`,
          ][idx]
      ),
    });
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
  checkType(id, "number", false);

  const selectedProduct = await Product.findOne({
    where: { id },
  });

  if (!selectedProduct) {
    throwError("There isn't any product with that id.", 400);
  }

  if (selectedProduct.images.length > 0) {
    selectedProduct.images.forEach((imgLink) =>
      removeFile(imgLink.split("/uploads/")[1])
    );
  }
  await stripe.prices.update(selectedProduct.stripePriceId, { active: false });
  await stripe.products.update(selectedProduct.stripeProductId, {
    metadata: { deletedAt: Date.now() },
    active: false,
    name: "DELETED-" + selectedProduct.title,
    images: [],
  });
  await selectedProduct.destroy();

  res.status(204).send({
    status: "success",
  });
});

exports.listProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  checkType(id, "number", false);

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
    throwError("Price can not be null or zero.", 400);
  }

  if (!selectedProduct.prevPrice && selectedProduct.showDiscount) {
    throwError(
      "Previous price can not be null or zero while showing discount.",
      400
    );
  }

  if (selectedProduct.unitCount === null) {
    throwError("Product unit count is needed to list a product", 400);
  }
  selectedProduct.isListed = true;
  await stripe.products.update(selectedProduct.stripeProductId, {
    active: true,
  });
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
  const { id } = req.params;
  checkType(id, "number", false);

  const [result, [selectedProduct]] = await Product.update(
    {
      isListed: false,
    },
    {
      where: { id },
      returning: true,
    }
  );
  if (result === 0) {
    throwError("There isn't any product with that id.", 400);
  }

  await stripe.products.update(selectedProduct?.stripeProductId, {
    active: false,
  });
  res.status(204).send({
    status: "success",
  });
});
