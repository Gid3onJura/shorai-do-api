const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const eventsController = require("../db/controller/event")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")
const { findAllEvents, createCalendarEvent, updateCalendarEvent } = require("../prisma/controller/event.controller")

router.get("/", authenticateToken, async (request, response) => {
  const findEvents = await findAllEvents()
  if (findEvents) {
    return response.send(findEvents).status(200)
  } else {
    return response.status(404).send()
  }
})

router.post("/", authenticateToken, validation(schemas.createCalendarEvent, "body"), async (request, response) => {
  const requestBody = request.body

  let eventData = {
    eventdate: new Date(requestBody.eventdate).toISOString(),
    eventcolor: requestBody.eventcolor,
    eventtype: requestBody.eventtype,
    description: requestBody.description,
    override: requestBody.override,
    repeating: requestBody.repeating,
    repetitiontype: requestBody.repetitiontype,
  }

  const eventAdded = await createCalendarEvent(eventData)
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
    // event: requestBody.event,
    eventdate: new Date(requestBody.eventdate).toISOString(),
    eventcolor: requestBody.eventcolor,
    eventtype: requestBody.eventtype,
    description: requestBody.description,
    override: requestBody.override,
    repeating: requestBody.repeating,
    repetitiontype: requestBody.repetitiontype,
    updatedAt: new Date(),
  }

  const eventId = parseInt(requestBody.event)

  if (!eventId) {
    return response.status(400).send({ message: "event id is mandatory" })
  }

  const eventUpdated = await updateCalendarEvent(eventData, eventId)

  if (eventUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "event not updated",
    })
  }
})

module.exports = router
