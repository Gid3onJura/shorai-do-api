const { PrismaClient } = require("@prisma/client")

const eventClient = new PrismaClient().events

module.exports = {
  findAllEvents: async function (data) {
    try {
      const events = await eventClient.findMany({
        select: {
          id: true,
          eventdate: true,
          eventcolor: true,
          eventtype: true,
          description: true,
          override: true,
          repeating: true,
          repetitiontype: true,
        },
      })

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
  findAllEventsInYear: async function (year) {
    try {
      const events = await eventClient.findMany({
        where: {
          eventdate: {
            gte: new Date(year, 0, 1),
            lte: new Date(year, 11, 31),
          },
        },
        select: {
          id: true,
          eventdate: true,
          eventcolor: true,
          eventtype: true,
          description: true,
          override: true,
          repeating: true,
          repetitiontype: true,
          eventdatetimefrom: true,
          eventdatetimeto: true,
          deadline: true,
        },
      })

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
      const newEvent = await eventClient.create({ data: data })
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
  updateCalendarEvent: async function (data, eventId) {
    try {
      const affectedRows = await eventClient.update({
        data: data,
        where: {
          id: eventId,
        },
      })
      if (affectedRows && affectedRows.id) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },
  deleteCalendarEvent: async function (eventId) {
    try {
      const deletedEvent = await eventClient.delete({
        where: {
          id: eventId,
        },
      })
      if (deletedEvent) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
