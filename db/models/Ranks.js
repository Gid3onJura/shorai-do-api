const Sequelize = require("sequelize")
const db = require("../index")

const User = db.define("ranks", {
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
  graduatedOn: {
    type: Sequelize.DATE,
  },
})

module.exports = User
