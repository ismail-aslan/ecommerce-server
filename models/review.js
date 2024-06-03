"use strict";

const Sequelize = require("sequelize");
const { ecommercedb } = require("./db");

module.exports = ecommercedb.define(
  "review",
  {
    showFullName: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    displayName: {
      type: Sequelize.TEXT,
      allowNull: false,
      set(value) {
        if (this.showFullName) {
          this.setDataValue("displayName", value);
        } else {
          const [name, surname] = value.split(" ");
          const hiddenName = name[0] + "***";
          const hiddenSurname = surname[0] + "***";
          this.setDataValue("displayName", hiddenName + " " + hiddenSurname);
        }
      },
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
