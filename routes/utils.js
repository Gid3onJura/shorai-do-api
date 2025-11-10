const express = require("express")
const router = express.Router()
const md5 = require("md5")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/**
 * generate md5 hash from password
 *
 *
 */
router.post("/generatepassword", async (request, response) => {
  const requestBody = request.body

  let generatedPassword

  if (requestBody.plainPassword) {
    generatedPassword = md5(requestBody.plainPassword)
  }

  if (generatedPassword) {
    return response.status(200).send({
      generatedPassword: generatedPassword,
    })
  }

  return response.status(400).send({
    message: "password not generated",
  })
})

/**
 * validate jwt token
 * @returns boolean
 */
router.post("/validatetoken", async (request, response) => {
  const token = request.body.token
  if (!token) {
    return response.status(401).send({ valid: false })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return response.status(401).send({ valid: false })
    }
    return response.status(200).send({ valid: true, user })
  })
})

module.exports = router
