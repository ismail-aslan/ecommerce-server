"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contactName: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    contactEmail: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    shippingDetails: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM([
        "pending",
        "paid",
        "ready",
        "shipped",
        "canceled",
        "resulted",
      ]),
      allowNull: false,
      defaultValue: "pending",
    },
  },

  {
    timestamps: true,
  }
);
