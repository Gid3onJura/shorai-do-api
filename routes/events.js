const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const eventsController = require("../db/controller/event")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")
const event = require("../db/controller/event")
const e = require("express")
const { convertDateTime } = require("../lib")

router.get("/", authenticateToken, async (request, response) => {
  const findEvents = await eventsController.findAllEvents()
  if (findEvents) {
    return response.send(findEvents).status(200)
  } else {
    return response.status(404).send()
  }
})

router.get("/reduced", async (request, response) => {
  const eventYear = request.query.year ?? new Date().getFullYear().toString()
  const findEvents = await eventsController.findAllEventsInYear(eventYear)
  if (findEvents) {
    let reducedEvents = []
    findEvents.forEach((event) => {
      reducedEvents.push({
        eventid: event.dataValues.id,
        eventyear: new Date(event.dataValues.eventdate).getFullYear().toString(),
        description: event.dataValues.description,
        eventdate: event.dataValues.eventdate,
        eventdatetimefrom: convertDateTime(event.dataValues.eventdatetimefrom),
        eventdatetimeto: convertDateTime(event.dataValues.eventdatetimeto),
        deadline: event.dataValues.deadline,
      })
    })
    return response.send(reducedEvents).status(200)
  } else {
    return response.status(404).send()
  }
})

router.post("/", authenticateToken, validation(schemas.createCalendarEvent, "body"), async (request, response) => {
  const requestBody = request.body

  let eventData = {
    eventdate: requestBody.eventdate,
    eventcolor: requestBody.eventcolor,
    eventtype: requestBody.eventtype,
    description: requestBody.description,
    override: requestBody.override,
    repeating: requestBody.repeating,
    repetitiontype: requestBody.repetitiontype,
    eventdatetimefrom: requestBody.eventdatetimefrom,
    eventdatetimeto: requestBody.eventdatetimeto,
  }

  const eventAdded = await eventsController.createCalendarEvent(eventData)
  if (eventAdded) {
    return response.status(201).send({})
  } else {
    return response.status(500).send({
      message: "event not created",
    })
  }
})

router.patch("/", authenticateToken, validation(schemas.updateCalendarEvent, "body"), async (request, response) => {
  const requestBody = request.body

  let eventData = {
    event: requestBody.event,
    eventdate: requestBody.eventdate,
    eventcolor: requestBody.eventcolor,
    eventtype: requestBody.eventtype,
    description: requestBody.description,
    override: requestBody.override,
    repeating: requestBody.repeating,
    repetitiontype: requestBody.repetitiontype,
    eventdatetimefrom: requestBody.eventdatetimefrom,
    eventdatetimeto: requestBody.eventdatetimeto,
  }

  const eventUpdated = await eventsController.updateCalendarEvent(eventData)

  if (eventUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "event not updated",
    })
  }
})

module.exports = router
