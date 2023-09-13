const Product = require("./product");
const Category = require("./category");
const User = require("./user");
const Cart = require("./cart");
const Order = require("./order");
const OrderItem = require("./orderItem");
const Review = require("./review");
const ReviewVote = require("./reviewVote");

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

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);

ReviewVote.belongsTo(User);
User.hasMany(ReviewVote);
ReviewVote.belongsTo(Review);
Review.hasMany(ReviewVote);

module.exports = {
  Product,
  Category,
  User,
  Cart,
  Order,
  OrderItem,
  Review,
  ReviewVote,
};
