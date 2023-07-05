const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const calendarController = require("../db/controller/event")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.post("/", authenticateToken, validation(schemas.createCalendarEvent, "body"), async (request, response) => {
  const requestBody = request.body

  let eventData = {
    eventdate: requestBody.eventdate,
    eventcolor: requestBody.eventcolor,
    eventtype: requestBody.eventtype,
    description: requestBody.description,
    override: requestBody.override,
    repeating: requestBody.repeating,
  }

  const eventAdded = await calendarController.createCalendarEvent(eventData)
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
  }

  const eventUpdated = await calendarController.updateCalendarEvent(eventData)

  if (eventUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "event not updated",
    })
  }
})

module.exports = router
