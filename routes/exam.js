const express = require("express")
require("dotenv").config()
const router = express.Router()

const examController = require("../db/controller/exam")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.post("/", authenticateToken, validation(schemas.createExam, "body"), async (request, response) => {
  const requestBody = request.body

  let examData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedon: requestBody.graduatedon,
  }

  // check category
  if (examData.category) {
    if (!["kyu", "dan"].includes(examData.category)) {
      return response.status(400).send({
        message: "check category",
      })
    }
  }

  // check color
  if (examData.color) {
    if (!["white", "yellow", "orange", "green", "blue", "brown"].includes(examData.color)) {
      return response.status(400).send({
        message: "which belt color is this?",
      })
    }
  }

  // check if exam already exists
  const examExists = await examController.examExists(examData)
  if (examExists && examExists.status > 201) {
    return response.status(500).send({})
  }
  if (examExists) {
    return response.status(400).send({
      message: "exam already exists for that user",
    })
  }

  const createdExam = await examController.createExam(examData)

  if (createdExam) {
    return response.status(201).send({})
  } else {
    return response.status(500).send({
      message: "exam not created",
    })
  }
})

router.patch("/", authenticateToken, validation(schemas.updateExam, "body"), async (request, response) => {
  const requestBody = request.body

  let examData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedon: requestBody.graduatedon,
    examid: requestBody.examid,
  }

  // check category
  if (examData.category) {
    if (!["kyu", "dan"].includes(examData.category)) {
      return response.status(400).send({
        message: "check category",
      })
    }
  }

  // check color
  if (examData.color) {
    if (!["white", "yellow", "orange", "green", "blue", "brown"].includes(examData.color)) {
      return response.status(400).send({
        message: "which belt color is this?",
      })
    }
  }

  // check if exam exists
  const examExists = await examController.examExistsById(examData.examid)
  if (examExists && examExists.status > 201) {
    return response.status(500).send({})
  }

  if (!examExists) {
    return response.status(404).send({
      message: "exam not exists",
    })
  }

  const examUpdated = await examController.updateExam(examData)

  if (examUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "exam not updated",
    })
  }
})

router.delete("/:id", authenticateToken, async (request, response) => {
  const deletedExam = await examController.deleteExamById(request.params.id)
  if (deletedExam) {
    return response.status(200).send()
  } else {
    return response.status(404).send()
  }
})

module.exports = router
