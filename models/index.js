const Product = require("./product");
const Category = require("./category");
const User = require("./user");
const Post = require("./post");

// table relationships
Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });

Product.belongsToMany(User, { through: "Favorite", as: "favorite" });
User.belongsToMany(Product, { through: "Favorite", as: "favorite" });

User.hasMany(Post);
Post.belongsTo(User);

module.exports = { Product, Category, User };
