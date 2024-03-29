const express = require("express")
const router = express.Router()
const md5 = require("md5")

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

module.exports = router
