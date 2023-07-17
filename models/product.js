"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "product",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    prevPrice: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    showDiscount: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    images: {
      type: Sequelize.JSONB,
      allowNull: false,
      default: [],
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
