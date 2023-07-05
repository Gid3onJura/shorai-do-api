const Event = require("../models/Event")

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
        ],
      }).catch((error) => [])
      if (events && events.length > 0) {
        return events
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
  createCalendarEvent: async function (data) {
    try {
      const newEvent = await Event.create(data)
      if (newEvent) {
        return true
      } else {
        return false
      }
    } catch (error) {
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
