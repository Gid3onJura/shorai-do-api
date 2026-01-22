const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const userController = require("../db/controller/users")
const examController = require("../db/controller/exam")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")
const { validateRoles } = require("../lib/roleValidator")

/**
 * get all user
 */
router.get("/", authenticateToken, async (request, response) => {
  const findUser = await userController.findAllUser()

  const allUsers = []

  const joinUserExam = new Promise((resolve, reject) => {
    let count = 0
    // for each user get exams
    findUser.forEach(async (user, index, array) => {
      const userId = user.dataValues.id
      const examsFromUser = await examController.findAllExamsFromUser(userId)
      user.dataValues.exams = examsFromUser
      allUsers.push(user)
      count++
      if (count === findUser.length) resolve()
    })
  })

  joinUserExam.then(() => {
    if (allUsers) {
      return response.send(allUsers).status(200)
    } else {
      return response.status(404).send()
    }
  })
})

/**
 * get user by id
 */
router.get("/:id", authenticateToken, async (request, response) => {
  const findUser = await userController.findUserById(request.params.id)

  if (findUser) {
    return response.send(findUser).status(200)
  } else {
    return response.status(404).send()
  }
})

/**
 * delete user by id
 */
router.delete("/:id", authenticateToken, async (request, response) => {
  const deletedUser = await userController.deleteUserById(request.params.id)
  if (deletedUser) {
    return response.status(200).send()
  } else {
    return response.status(404).send()
  }
})

/**
 * register new user
 *
 * @returns int userid
 */
router.post("/", authenticateToken, validation(schemas.createUser, "body"), async (request, response) => {
  const requestBody = request.body

  // Rollen validieren
  if (requestBody.role && requestBody.role.length > 0) {
    const rolesValidation = validateRoles(requestBody.role)
    if (!rolesValidation.valid) {
      return response.status(400).send({
        message: rolesValidation.message,
      })
    }
  }

  let userData = {
    name: requestBody.name,
    nickname: requestBody.nickname,
    email: requestBody.email,
    birth: requestBody.birth,
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    graduatedon: requestBody.graduatedon,
    activated: requestBody.activated,
    roles: requestBody.roles || ["user"],
  }

  if (requestBody.password) {
    userData.password = md5(requestBody.password)
  }

  // check nickname
  if (userData.nickname) {
    const nicknameExists = await userController.nicknameExists(userData.nickname)
    if (nicknameExists && nicknameExists.status > 201) {
      return response.status(500).send({})
    }
    if (nicknameExists) {
      return response.status(400).send({
        message: "user already exists",
      })
    }
  }

  // check name
  if (userData.name) {
    const nameExists = await userController.nameExists(userData.name)
    if (nameExists && nameExists.status > 201) {
      return response.status(500).send({})
    }
    if (nameExists) {
      return response.status(400).send({
        message: "name already exists",
      })
    }
  }

  // check email
  if (userData.email) {
    const emailExists = await userController.emailExists(userData.email)
    if (emailExists && emailExists.status > 201) {
      return response.status(500).send({})
    }
    if (emailExists) {
      return response.status(400).send({
        message: "email already exists",
      })
    }
  }

  const userAdded = await userController.createUser(userData)
  if (userAdded) {
    return response.status(201).send({ userid: userAdded })
  } else {
    return response.status(500).send({
      message: "user not created",
    })
  }
})

/**
 * update user
 */
router.patch("/", authenticateToken, validation(schemas.updateUser, "body"), async (request, response) => {
  const requestBody = request.body

  // Rollen validieren
  if (requestBody.role && requestBody.role.length > 0) {
    const rolesValidation = validateRoles(requestBody.role)
    if (!rolesValidation.valid) {
      return response.status(400).send({
        message: rolesValidation.message,
      })
    }
  }

  let userData = {
    name: requestBody.name,
    nickname: requestBody.nickname,
    email: requestBody.email,
    birth: requestBody.birth,
    rank: requestBody.rank,
    category: requestBody.category,
    color: requestBody.color,
    graduatedon: requestBody.graduatedon,
    user: requestBody.user,
    activated: requestBody.activated,
    roles: requestBody.roles,
  }

  if (requestBody.password) {
    userData.password = md5(requestBody.password)
  }

  // check nickname
  if (userData.nickname) {
    const nicknameExists = await userController.nicknameExists(userData.nickname)
    if (nicknameExists && nicknameExists.status > 201) {
      return response.status(500).send({})
    }
    if (nicknameExists) {
      return response.status(400).send({
        message: "user already exists",
      })
    }
  }

  // check name
  if (userData.name) {
    const nameExists = await userController.nameExists(userData.name)
    if (nameExists && nameExists.status > 201) {
      return response.status(500).send({})
    }
    if (nameExists) {
      return response.status(400).send({
        message: "name already exists",
      })
    }
  }

  // check email
  if (userData.email) {
    const emailExists = await userController.emailExists(userData.email)
    if (emailExists && emailExists.status > 201) {
      return response.status(500).send({})
    }
    if (emailExists) {
      return response.status(400).send({
        message: "email already exists",
      })
    }
  }

  const userUpdated = await userController.updateUser(userData)

  if (userUpdated) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "user not updated",
    })
  }
})

module.exports = router
