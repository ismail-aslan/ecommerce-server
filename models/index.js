const Product = require("./product");
const Category = require("./category");
const User = require("./user");
const Post = require("./post");
const Cart = require("./cart");

// table relationships
Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });

Product.belongsToMany(User, { through: "Favorite", as: "favorite" });
User.belongsToMany(Product, { through: "Favorite", as: "favorite" });

//#region Cart relations
Product.belongsToMany(User, { through: Cart });
User.belongsToMany(Product, { through: Cart });
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);
//#endregion

module.exports = { Product, Category, User };
