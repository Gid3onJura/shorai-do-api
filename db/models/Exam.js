const Sequelize = require("sequelize")
const db = require("../index")

const Exam = db.define(
  "ranks",
  {
    rank: {
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.INTEGER,
    },
    graduatedon: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
  }
)

module.exports = Exam
