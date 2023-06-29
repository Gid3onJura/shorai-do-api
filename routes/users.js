const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const userController = require("../db/controller/users")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.get("/", authenticateToken, async (request, response) => {
  const findUser = await userController.findAllUser()
  if (findUser) {
    return response.send(findUser).status(200)
  } else {
    return response.status(404).send()
  }
})

router.get("/:id", authenticateToken, async (request, response) => {
  const findUser = await userController.findUserById(request.params.id)
  if (findUser) {
    return response.send(findUser).status(200)
  } else {
    return response.status(404).send()
  }
})

router.delete("/:id", authenticateToken, async (request, response) => {
  const deletedUser = await userController.deleteUserById(request.params.id)
  if (deletedUser) {
    return response.status(200).send()
  } else {
    return response.status(404).send()
  }
})

router.post("/", validation(schemas.createUser, "body"), async (request, response) => {
  const requestBody = request.body

  let userData = {
    nickname: requestBody.nickname,
    password: md5(requestBody.password),
    email: requestBody.email,
    birth: requestBody.birth,
  }

  const nicknameExists = await userController.nicknameExists(userData.nickname)
  if (nicknameExists && nicknameExists.status > 201) {
    return response.status(500).send()
  }
  if (nicknameExists) {
    return response.status(400).send({
      message: "user already exists",
    })
  }

  const emailExists = await userController.emailExists(userData.email)
  if (emailExists && emailExists.status > 201) {
    return response.status(500).send()
  }
  if (emailExists) {
    return response.status(400).send({
      message: "user already exists",
    })
  }

  // user is not active
  userData.activated = false

  const userAdded = await userController.createUser(userData)
  if (userAdded) {
    return response.status(201).send()
  } else {
    return response.status(500).send({
      message: "user not created",
    })
  }
})

module.exports = router
