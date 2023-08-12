"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "product",
  {
    title: {
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
    unitCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    soldCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isListed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    showDiscount: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    images: {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue("images");
        return (
          rawValue?.map(
            (imageName) => process.env.BASE_URL + "uploads/" + imageName
          ) || []
        );
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    stripeProductId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    stripePriceId: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
