const bcrypt = require("bcrypt");

module.exports = (password, hash) => bcrypt.compareSync(password, hash);
