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
      allowNull: true,
      default: [],
      get() {
        const rawValue = this.getDataValue("images");
        return (
          rawValue?.map((imageName) => process.env.BASE_URL + imageName) || []
        );
      },
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
