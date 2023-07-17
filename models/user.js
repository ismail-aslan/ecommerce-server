"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "user",
  {
    name: {
      type: Sequelize.CHAR(150),
      allowNull: false,
    },
    sur_name: {
      type: Sequelize.CHAR(150),
      allowNull: false,
    },
    email: {
      type: Sequelize.CHAR(150),
      allowNull: false,
    },
    password: {
      type: Sequelize.CHAR(150),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
