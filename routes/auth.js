const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const router = express.Router()

const userController = require("../db/controller/users")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")

let refreshTokens = []

router.post("/login", validation(schemas.loginUser, "body"), async (request, response) => {
  try {
    const { nickname, password } = request.body
    // authenticate user
    const userAllowed = await authenticateUser(nickname, password)

    if (userAllowed) {
      const accessToken = generateAccessToken({
        id: userAllowed.id,
        nickname: userAllowed.nickname,
      })
      const refreshToken = generateRefreshToken(userAllowed)
      saveRefreshToken(refreshToken)
      return response.send({ accessToken, refreshToken })
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

  if (!refreshTokenExists(refreshToken)) {
    console.error("refreshToken exists error")
    return response.status(403).send()
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.error("verify refreshToken error")
      return response.status(403).send()
    }
    const accessToken = generateAccessToken({
      id: user.id,
      nickname: user.nickname,
    })
    return response.send({ accessToken })
  })
})

router.delete("/logout", validation(schemas.logout, "body"), async (request, response) => {
  const refreshToken = request.body.token
  if (!deleteRefreshToken(refreshToken)) {
    return response.status(403).send()
  }
  const accessToken = generateAccessToken({}, 1)
  return response.status(200).send({ accessToken })
})

const authenticateUser = async (nickname, password) => {
  return await userController.userExists(nickname, password)
}

const generateAccessToken = (user, expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  })
}

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}

const saveRefreshToken = (token) => {
  refreshTokens.push(token)
  return
}

const refreshTokenExists = (token) => {
  return refreshTokens.includes(token)
}

const deleteRefreshToken = (refreshToken) => {
  if (!refreshTokens.includes(refreshToken)) {
    return false
  }
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  return true
}

module.exports = router
