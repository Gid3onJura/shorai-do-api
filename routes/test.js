const express = require("express")
const router = express.Router()

router.get("/alive", async (request, response) => {
  return response.status(200).send({
    message: "api alive",
  })
})

router.get("/", async (request, response) => {
  return response.status(200).send({
    message: "welcome!",
  })
})

module.exports = router
