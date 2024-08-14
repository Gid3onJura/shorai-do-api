const express = require("express")
require("dotenv").config()
const router = express.Router()

// const examController = require("../db/controller/exam")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")
const { rankExists, createRank } = require("../prisma/controller/rank.controller")

// create rank
router.post("/", authenticateToken, validation(schemas.createRank, "body"), async (request, response) => {
  const requestBody = request.body

  let rankData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedon: new Date(requestBody.graduatedon),
  }

  // check category
  if (rankData.category) {
    if (!["kyu", "dan"].includes(rankData.category)) {
      return response.status(400).send({
        message: "check category",
      })
    }
  }

  // check color
  if (rankData.color) {
    if (!["white", "yellow", "orange", "green", "blue", "brown"].includes(rankData.color)) {
      return response.status(400).send({
        message: "which belt color is this?",
      })
    }
  }

  // check if rank already exists
  const rankAlreadyExists = await rankExists(rankData)
  if (rankAlreadyExists && rankAlreadyExists.status > 201) {
    return response.status(500).send({})
  }
  if (rankAlreadyExists) {
    return response.status(400).send({
      message: "rank already exists for that user",
    })
  }

  // create rank
  const createdRank = await createRank(rankData)
  if (createdRank && createdRank.status) {
    return response.status(createdRank.status).send({ message: createdRank.message })
  } else if (createdRank && !createdRank.status) {
    return response.status(201).send({})
  } else {
    return response.status(500).send({
      message: "rank not created",
    })
  }
})

// update rank
router.patch("/", authenticateToken, validation(schemas.updateRank, "body"), async (request, response) => {
  const requestBody = request.body

  let rankData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedon: requestBody.graduatedon,
    // rankid: requestBody.rankid,
  }

  const rankId = requestBody.rankid

  // check category
  if (rankData.category) {
    if (!["kyu", "dan"].includes(rankData.category)) {
      return response.status(400).send({
        message: "check category",
      })
    }
  }

  // check color
  if (rankData.color) {
    if (!["white", "yellow", "orange", "green", "blue", "brown"].includes(rankData.color)) {
      return response.status(400).send({
        message: "which belt color is this?",
      })
    }
  }

  // check if rank exists
  const rankAlreadyExists = await examController.examExistsById(rankData.examid)
  if (rankAlreadyExists && rankAlreadyExists.status > 201) {
    return response.status(500).send({})
  }

  if (!rankAlreadyExists) {
    return response.status(404).send({
      message: "rank not exists",
    })
  }

  const rankUpdated = await examController.updateExam(rankData)

  if (rankUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "rank not updated",
    })
  }
})

router.delete("/:id", authenticateToken, async (request, response) => {
  const deletedRank = await examController.deleteExamById(request.params.id)
  if (deletedRank) {
    return response.status(200).send()
  } else {
    return response.status(404).send()
  }
})

module.exports = router
