const { PrismaClient } = require("@prisma/client")
const md5 = require("md5")

const usersClient = new PrismaClient().users

module.exports = {
  getAllUsers: async function () {
    try {
      const allUsers = await usersClient.findMany({
        select: {
          id: true,
          nickname: true,
          name: true,
          email: true,
          dojo: true,
          activated: true,
          birth: true,
          ranks: true,
        },
      })

      if (allUsers) {
        return allUsers
      }
      return []
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "[get all user]: database error",
      }
    }
  },
  getUserById: async function (userid) {
    try {
      const user = await usersClient.findUnique({
        select: {
          id: true,
          nickname: true,
          name: true,
          email: true,
          dojo: true,
          activated: true,
          birth: true,
          ranks: true,
        },
        where: {
          id: userid,
        },
      })

      if (user) {
        return user
      }
      return []
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "[get by id]: database error",
      }
    }
  },
  createUser: async function (user) {
    try {
      const newUser = await usersClient.create({ data: user })
      if (newUser && newUser.id) {
        return newUser.id
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "[create user]: database error",
      }
    }
  },
  updateUser: async function (data, userid) {
    try {
      const affectedRows = await usersClient.update({
        data: data,
        where: {
          id: userid,
        },
      })

      if (affectedRows && affectedRows.id) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "[update user]: database error",
      }
    }
  },
  deleteUserById: async function (id) {
    try {
      const user = await usersClient.delete({
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
        message: error?.meta?.cause || "[delete user]: database error",
      }
    }
  },
  userExists: async function (nickname, password) {
    try {
      const user = await usersClient.findFirst({
        select: {
          id: true,
          nickname: true,
        },
        where: { nickname: nickname, password: md5(password), activated: true },
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
        message: error?.meta?.cause || "[user exists]: database error",
      }
    }
  },
  nameExists: async function (name) {
    try {
      const user = await usersClient.findFirst({
        select: {
          id: true,
        },
        where: {
          name: name,
        },
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
        message: error?.meta?.cause || "[name exists]: database error",
      }
    }
  },
  nicknameExists: async function (nickname) {
    try {
      const user = await usersClient.findFirst({
        select: {
          id: true,
        },
        where: {
          nickname: nickname,
        },
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
        message: error?.meta?.cause || "[nickname exists]: database error",
      }
    }
  },
  emailExists: async function (email) {
    try {
      const user = await usersClient.findFirst({
        select: { id: true },
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
        message: error?.meta?.cause || "[email exists]: database error",
      }
    }
  },
  resetCodeExists: async function (resetCode) {
    try {
      const user = await usersClient.findFirst({
        select: {
          id: true,
        },
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
        message: error?.meta?.cause || "[reset code exists]: database error",
      }
    }
  },
}
