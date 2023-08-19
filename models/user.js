"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");
const { USER_STATUS, USER_ROLE } = require("../constants");

module.exports = ecommercedb.define(
  "user",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    surname: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userStatus: {
      type: Sequelize.DataTypes.ENUM(USER_STATUS),
      allowNull: false,
      defaultValue: "pending",
    },
    userRole: {
      type: Sequelize.DataTypes.ENUM(USER_ROLE),
      allowNull: false,
      defaultValue: "standard",
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verificationCode: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    verificationDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
