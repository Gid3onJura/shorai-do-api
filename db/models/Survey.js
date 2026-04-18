const Sequelize = require("sequelize")
const db = require("../index")

const Survey = db.define("surveys", {
  deadline: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  survey: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

module.exports = Survey
