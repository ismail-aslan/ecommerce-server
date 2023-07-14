"use strict";

const Sequelize = require("sequelize");
const { sampledb } = require("./index");


module.exports = sampledb.define(
    "post",
    {
        title: {
            type: Sequelize.CHAR(150),
            allowNull: false,
        },
        content: {
            type: Sequelize.CHAR(150),
            allowNull: false,
        },
        image: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);
