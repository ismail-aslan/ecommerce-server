const Sequelize = require("sequelize");

// creating the auth url
const url = process.env.SAMPLE_DB_URL;
// creating the db instance
const sampledb = new Sequelize(url, {
    logging: false,
    dialect: 'postgres',
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true
    },
});

module.exports = { sampledb };

const User = require("./user");
const Post = require("./post");

// table relationships
User.hasMany(Post);
Post.belongsTo(User);