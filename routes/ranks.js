const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const rankController = require("../db/controller/ranks")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.post("/", authenticateToken, validation(schemas.createRank, "body"), async (request, response) => {
  const requestBody = request.body

  const rankData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedOn: requestBody.graduatedon,
  }

  const rankAdded = await rankController.createRank(rankData)

  if (rankAdded) {
    return response.status(201).send()
  } else {
    return response.status(500).send({
      message: "rank not created",
    })
  }
})

router.patch("/", authenticateToken, validation(schemas.createRank, "body"), async (request, response) => {
  const requestBody = request.body

  const rankData = {
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    user: requestBody.user,
    graduatedOn: requestBody.graduatedon,
  }

  const rankUpdated = await rankController.updateRank(rankData)

  if (rankUpdated) {
    return response.status(200).send()
  } else {
    return response.status(404).send({
      message: "rank not updated",
    })
  }
})

module.exports = router
