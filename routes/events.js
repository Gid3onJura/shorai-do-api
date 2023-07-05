const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const eventsController = require("../db/controller/event")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.get("/", authenticateToken, async (request, response) => {
  const findEvents = await eventsController.findAllEvents()
  if (findEvents) {
    return response.send(findEvents).status(200)
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
