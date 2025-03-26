const Sequelize = require("sequelize")
const db = require("../index")

const Calendar = db.define("events", {
  eventdate: {
    type: Sequelize.DATE,
  },
  eventcolor: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  override: {
    type: Sequelize.BOOLEAN,
  },
  repeating: {
    type: Sequelize.BOOLEAN,
  },
  repetitiontype: {
    type: Sequelize.STRING,
  },
  eventtype: {
    type: Sequelize.STRING,
  },
  eventdatetimefrom: {
    type: Sequelize.DATE,
  },
  eventdatetimeto: {
    type: Sequelize.DATE,
  },
})

module.exports = Calendar
