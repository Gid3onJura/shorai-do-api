const Sequelize = require("sequelize")
const db = require("../index")

const Option = db.define("options", {
  eventid: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
})

module.exports = Option
