const Sequelize = require("sequelize")
const db = require("../index")

const Dojo = db.define("dojo", {
  name: {
    type: Sequelize.STRING,
  },
})

module.exports = Dojo
