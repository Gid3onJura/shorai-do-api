const express = require("express")
const router = express.Router()

router.get("/alive", async (request, response) => {
  return response.status(200).send({
    message: "api alive",
  })
})

module.exports = router
