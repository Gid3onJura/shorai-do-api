const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const router = express.Router()

const userController = require("../db/controller/users")
const refTokenController = require("../db/controller/refreshtoken")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { generateResetCode, createMailTransporter, verifyConnection, sendMail } = require("../lib")

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

router.post("/forgotpassword", validation(schemas.forgotpassword, "body"), async (request, response) => {
  let emailExists

  // get email from request body
  const email = request.body.email

  // check is there a user with this email...
  if (email) {
    emailExists = await userController.emailExists(email)
    if (emailExists && emailExists.status > 201) {
      return response.status(500).send({
        message: "forgot password function has an error",
      })
    }
    if (!emailExists) {
      return response.status(404).send({
        message: "email not exists",
      })
    }
  } else {
    return response.status(404).send({
      message: "email not exists",
    })
  }

  // ... if user exists generate 6-digit code and save in database
  let resetCode = (await generateResetCode()).toString()
  let countTries = 100
  while ((await userController.resetCodeExists(resetCode)) && countTries >= 0) {
    resetCode = (await generateResetCode()).toString()
    countTries--
  }

  if (countTries == 0) {
    return response.status(500).send({
      message: "error generate reset code",
    })
  }

  const updatedUser = await userController.updateUser({
    id: emailExists.id,
    user: emailExists.id,
    resetcode: resetCode,
  })

  if (!updatedUser) {
    return response.status(500).send({
      message: "reset code can not save in database",
    })
  }

  // prepare email with code
  const transporter = await createMailTransporter()

  if (!verifyConnection(transporter)) {
    return response.status(500).send({
      message: "no connection to mailserver",
    })
  }

  // sending mail
  const sendedMail = await sendMail(transporter, email, resetCode)

  if (!sendedMail) {
    return response.status(500).send({
      message: "mail not sended",
    })
  }

  // response
  return response.status(200).send({
    message: "mail sended",
  })
})

router.post("/resetpassword", validation(schemas.resetpassword, "body"), async (request, response) => {})

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
