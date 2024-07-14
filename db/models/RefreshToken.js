const Sequelize = require("sequelize")
const db = require("../index")

const RefreshToken = db.define("refreshToken", {
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = RefreshToken
