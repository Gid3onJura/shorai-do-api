const express = require("express")
const router = express.Router()
require("dotenv").config()

router.get("/alive", async (request, response) => {
  if (process.env.API_STATE == "SERVICE") {
    return response.status(900).send({
      message: "api is currently in maintenance",
    })
  }
  return response.status(200).send({
    message: "api alive",
  })
})

router.get("/", async (request, response) => {
  return response.status(200).send({
    message: "welcome!",
  })
})

router.get("*", async (request, response) => {
  return response.status(404).send({
    message: "this route is unkown",
  })
})

module.exports = router
