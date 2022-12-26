const Sequelize = require("sequelize");
const db = require("../index");

const User = db.define("users", {
  nickname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  dojo: {
    type: Sequelize.INTEGER,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
