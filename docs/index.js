const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const tags = require("./tags");
const carts = require("./carts");
const categories = require("./categories");
const favs = require("./favs");
const orders = require("./orders");
const users = require("./users");
const products = require("./products");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  paths: { ...users, ...products, ...carts, ...categories, ...favs, ...orders },
};
