const md5 = require("md5")
const User = require("../models/User")
const examController = require("./exam")

module.exports = {
  findAllUser: async function () {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "nickname",
          "name",
          "email",
          "dojo",
          "activated",
          "birth",
          "rank",
          "category",
          "color",
          "graduatedon",
        ],
        order: [["id", "ASC"]],
      }).catch((error) => [])
      if (users && users.length > 0) {
        return users
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
  findUserById: async function (id) {
    try {
      const user = await User.findOne({
        attributes: [
          "id",
          "nickname",
          "name",
          "email",
          "dojo",
          "activated",
          "birth",
          "rank",
          "category",
          "color",
          "graduatedon",
        ],
        where: { id: id },
      })
      if (user) {
        // append exams to user
        const examsFromUser = await examController.findAllExamsFromUser(user.id)
        user.dataValues.exams = examsFromUser

        return user
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  deleteUserById: async function (id) {
    try {
      const user = await User.destroy({
        where: { id: id },
      })
      if (user) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  nameExists: async function (name) {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: { name: name },
      })
      if (user) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  nicknameExists: async function (nickname) {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: { nickname: nickname },
      })
      if (user) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  emailExists: async function (email) {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: { email: email },
      })
      if (user) {
        return user
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  resetCodeExists: async function (resetCode) {
    try {
      const user = await User.findOne({
        attributes: ["id"],
        where: { resetcode: resetCode },
      })
      if (user) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error",
      }
    }
  },
  createUser: async function (data) {
    try {
      const newUser = await User.create(data)
      if (newUser && newUser.id) {
        return newUser.id
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
  updateUser: async function (data) {
    try {
      const affectedRows = await User.update(data, {
        where: {
          id: data.user,
        },
      })
      if (affectedRows && affectedRows[0] >= 1) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },
  userExists: async function (nickname, password) {
    try {
      const user = await User.findOne({
        attributes: ["id", "nickname"],
        where: { nickname: nickname, password: md5(password), activated: true },
      })
      if (user) {
        return user.dataValues
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
