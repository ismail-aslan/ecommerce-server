"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");
const { ORDER_STATUS } = require("../constants");

module.exports = ecommercedb.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recieverName: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    addressLine1: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    addressLine2: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    city: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    state: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    country: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    postalCode: {
      type: Sequelize.NUMBER,
      allowNull: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM(ORDER_STATUS),
      allowNull: false,
      defaultValue: "pending",
    },
  },

  {
    timestamps: true,
  }
);
