const md5 = require("md5")
const User = require("../models/User")
const db = require("../../db/index")

module.exports = {
  findAllUser: async function () {
    try {
      const [users, metadata] = await db.query(
        "SELECT users.id, users.nickname, rank, color, graduatedOn, birth, activated FROM users LEFT JOIN ranks ON users.id = ranks.user;"
      )
      // const users = await User.findAll({
      //   attributes: ["id", "nickname", "email", "dojo", "birth"],
      // }).catch((error) => [])
      return users
    } catch (error) {
      console.log(error)
      return []
    }
  },
  findUserById: async function (id) {
    try {
      const user = await User.findOne({
        attributes: ["id", "nickname", "email", "dojo", "activated", "birth"],
        where: { id: id },
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
      return true
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
