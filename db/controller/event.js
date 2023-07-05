const Calendar = require("../models/Event")

module.exports = {
  createCalendarEvent: async function (data) {
    try {
      const newEvent = await Calendar.create(data)
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
      const affectedRows = await Calendar.update(data, {
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
