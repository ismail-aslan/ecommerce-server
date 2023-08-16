"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "orderItem",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },

  {
    timestamps: true,
  }
);
