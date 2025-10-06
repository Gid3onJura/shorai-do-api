const Event = require("../models/Event")
const Option = require("../models/Option")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const db = require("../index")

module.exports = {
  findAllEvents: async function (data) {
    try {
      const events = await Event.findAll({
        attributes: [
          "id",
          "eventdate",
          "eventcolor",
          "eventtype",
          "description",
          "override",
          "repeating",
          "repetitiontype",
          "eventdatetimefrom",
          "eventdatetimeto",
          "deadline",
        ],
        include: [
          {
            model: Option,
            as: "options",
            attributes: ["id", "description"],
          },
        ],
      }).catch((error) => [])
      if (events && events.length > 0) {
        return events
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
  findAllEventsInYear: async function (year) {
    try {
      const events = await Event.findAll({
        attributes: [
          "id",
          "eventdate",
          "eventcolor",
          "eventtype",
          "description",
          "override",
          "repeating",
          "repetitiontype",
          "eventdatetimefrom",
          "eventdatetimeto",
          "deadline",
        ],
        include: [
          {
            model: Option,
            as: "options",
            attributes: ["id", "description"],
          },
        ],
        where: db.where(db.fn("YEAR", db.col("eventdate")), year),
      }).catch((error) => [])
      if (events && events.length > 0) {
        return events
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
  createCalendarEvent: async function (data) {
    const transaction = await Event.sequelize.transaction()
    try {
      const newEvent = await Event.create(data, { transaction: transaction })

      if (data.options && Array.isArray(data.options) && data.options.length > 0) {
        const optionObjects = data.options.map((desc) => ({
          eventid: newEvent.id,
          description: desc,
        }))

        await Option.bulkCreate(optionObjects, { transaction: transaction })
      }

      await transaction.commit()

      // 👉 danach das vollständige Event mit Optionen laden:
      const fullEvent = await Event.findByPk(newEvent.id, {
        attributes: [
          "id",
          "eventdate",
          "eventcolor",
          "eventtype",
          "description",
          "override",
          "repeating",
          "repetitiontype",
          "eventdatetimefrom",
          "eventdatetimeto",
          "deadline",
        ],
        include: [{ model: Option, as: "options", attributes: ["id", "description"] }],
      })

      return fullEvent
    } catch (error) {
      await transaction.rollback()
      console.log(error)
      return false
    }
  },
  updateCalendarEvent: async function (data) {
    try {
      const affectedRows = await Event.update(data, {
        where: {
          id: data.event,
        },
      })
      if (affectedRows && affectedRows[0] >= 1) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
