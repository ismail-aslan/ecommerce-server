"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./index");

module.exports = ecommercedb.define(
  "category",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
