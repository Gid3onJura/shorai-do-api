const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

// const userController = require("../db/controller/users")
// const examController = require("../db/controller/exam")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  nicknameExists,
  nameExists,
  emailExists,
  createUser,
  updateUser,
} = require("../prisma/controller/user.controller")

/**
 * get all user
 */
router.get("/", authenticateToken, async (request, response) => {
  const allUsers = await getAllUsers()

  if (allUsers && allUsers.status) {
    return response.send(allUsers).status(allUsers.status)
  } else if (allUsers && !allUsers.status) {
    return response.send(allUsers).status(200)
  } else {
    return response.status(404).send()
  }
})

/**
 * get user by id
 */
router.get("/:id", authenticateToken, async (request, response) => {
  const userid = request.params.id
  if (!userid) {
    return response.status(400).send({
      message: "user id not exists",
    })
  }

  const findUser = await getUserById(parseInt(userid))

  if (findUser && findUser.status) {
    return response.status(findUser.status).send({ message: findUser.message })
  } else if (findUser && !findUser.status) {
    return response.status(200).send(findUser)
  } else {
    return response.status(404).send()
  }
})

/**
 * delete user by id
 */
router.delete("/:id", authenticateToken, async (request, response) => {
  const userid = request.params.id
  if (!userid) {
    return response.status(400).send({
      message: "user id not exists",
    })
  }

  const deletedUser = await deleteUserById(parseInt(userid))
  if (deletedUser && deletedUser.status) {
    return response.status(deletedUser.status).send({ message: deletedUser.message })
  } else if (deletedUser && !deletedUser.status) {
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

  let userData = {
    name: requestBody.name,
    nickname: requestBody.nickname,
    email: requestBody.email,
    birth: new Date(requestBody.birth),
    // rank: requestBody.rank,
    // category: requestBody.category,
    // color: requestBody.color,
    // graduatedon: requestBody.graduatedon,
    activated: requestBody.activated,
  }

  if (requestBody.password) {
    userData.password = md5(requestBody.password)
  }

  // check nickname
  if (userData.nickname) {
    const userWithNicknameExists = await nicknameExists(userData.nickname)
    if (userWithNicknameExists && userWithNicknameExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithNicknameExists) {
      return response.status(400).send({
        message: "user already exists",
      })
    }
  }

  // check name
  if (userData.name) {
    const userWithNameExists = await nameExists(userData.name)
    if (userWithNameExists && userWithNameExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithNameExists) {
      return response.status(400).send({
        message: "name already exists",
      })
    }
  }

  // check email
  if (userData.email) {
    const userWithEmailExists = await emailExists(userData.email)
    if (userWithEmailExists && userWithEmailExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithEmailExists) {
      return response.status(400).send({
        message: "email already exists",
      })
    }
  }

  const userAdded = await createUser(userData)
  if (userAdded && userAdded.status) {
    return response.status(userAdded.status).send({ message: userAdded.message })
  } else if (userAdded && !userAdded.status) {
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
  let userid = 0

  let userData = {
    name: requestBody.name,
    nickname: requestBody.nickname,
    email: requestBody.email,
    birth: new Date(requestBody.birth),
    // rank: requestBody.rank,
    // category: requestBody.category,
    // color: requestBody.color,
    // graduatedon: requestBody.graduatedon,
    // user: requestBody.user,
    activated: requestBody.activated,
  }

  if (requestBody.user) {
    userid = requestBody.user
  }

  if (requestBody.password) {
    userData.password = md5(requestBody.password)
  }

  // check nickname
  if (userData.nickname) {
    const userWithNicknameExists = await nicknameExists(userData.nickname)
    if (userWithNicknameExists && userWithNicknameExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithNicknameExists) {
      return response.status(400).send({
        message: "user already exists",
      })
    }
  }

  // check name
  if (userData.name) {
    const userWithNameExists = await nameExists(userData.name)
    if (userWithNameExists && userWithNameExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithNameExists) {
      return response.status(400).send({
        message: "name already exists",
      })
    }
  }

  // check email
  if (userData.email) {
    const userWithEmailExists = await emailExists(userData.email)
    if (userWithEmailExists && userWithEmailExists.status > 201) {
      return response.status(500).send({})
    }
    if (userWithEmailExists) {
      return response.status(400).send({
        message: "email already exists",
      })
    }
  }

  const userUpdated = await updateUser(userData, userid)

  if (userUpdated && userUpdated.status) {
    return response.status(userUpdated.status).send({ message: userUpdated.message })
  } else if (userUpdated && !userUpdated.status) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "user not updated",
    })
  }
})

module.exports = router
