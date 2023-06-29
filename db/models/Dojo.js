const Sequelize = require("sequelize")
const db = require("../index")

const User = db.define("dojo", {
  name: {
    type: Sequelize.STRING,
  },
})

module.exports = User
