const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const router = express.Router()

const userController = require("../db/controller/users")
const refTokenController = require("../db/controller/refreshtoken")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")

router.post("/login", validation(schemas.loginUser, "body"), async (request, response) => {
  try {
    const { nickname, password } = request.body
    // authenticate user
    const userAllowed = await authenticateUser(nickname, password)

    if (userAllowed) {
      const accessToken = await generateAccessToken({
        id: userAllowed.id,
        nickname: userAllowed.nickname,
      })
      const refreshToken = await generateRefreshToken(userAllowed)
      const saveRefTokenSuccessfull = await saveRefreshToken(refreshToken)
      if (saveRefTokenSuccessfull) {
        return response.send({ accessToken, refreshToken })
      }
      return response.status(500).send({
        message: "saving ref token not successfully",
      })
    }

    return response.status(403).send({})
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "login not available",
    })
  }
})

router.post("/refreshtoken", validation(schemas.refreshToken, "body"), async (request, response) => {
  const refreshToken = request.body.token
  if (!refreshToken) {
    return response.status(401).send()
  }

  const refTokenExists = await refreshTokenExists(refreshToken)
  if (!refTokenExists) {
    return response.status(403).send({
      message: "refreshToken exists error",
    })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, user) => {
    if (error) {
      return response.status(403).send({
        message: "verify refreshToken error",
      })
    }
    const accessToken = await generateAccessToken({
      id: user.id,
      nickname: user.nickname,
    })
    return response.send({ accessToken })
  })
})

router.delete("/logout", validation(schemas.logout, "body"), async (request, response) => {
  const refreshToken = request.body.token
  if (!(await deleteRefreshToken(refreshToken))) {
    return response.status(403).send({})
  }
  // const accessToken = generateAccessToken({}, 1)
  return response.status(200).send({})
})

const authenticateUser = async (nickname, password) => {
  return await userController.userExists(nickname, password)
}

const generateAccessToken = async (user, expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  })
}

const generateRefreshToken = async (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

const saveRefreshToken = async (token) => {
  return await refTokenController.setToken(token)
}

const refreshTokenExists = async (token) => {
  return await refTokenController.refTokenExists(token)
}

const deleteRefreshToken = async (refreshToken) => {
  return await refTokenController.deleteToken(refreshToken)
}

module.exports = router
