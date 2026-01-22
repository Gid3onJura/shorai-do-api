const Sequelize = require("sequelize")
const db = require("../index")

const User = db.define("users", {
  nickname: {
    type: Sequelize.STRING,
  },
  name: {
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
  roles: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  activated: {
    type: Sequelize.BOOLEAN,
  },
  birth: {
    type: Sequelize.DATE,
  },
  rank: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
  graduatedon: {
    type: Sequelize.DATE,
  },
  resetcode: {
    type: Sequelize.STRING,
  },
})

module.exports = User
