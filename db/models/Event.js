const Sequelize = require("sequelize")
const db = require("../index")
const Option = require("./Option")

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
  deadline: {
    type: Sequelize.DATE,
  },
  note: {
    type: Sequelize.TEXT,
  },
})

// 💡 Beziehung definieren
Calendar.hasMany(Option, {
  foreignKey: "eventid",
  as: "options",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})

module.exports = Calendar
