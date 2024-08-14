const { PrismaClient } = require("@prisma/client")

const refTokenClient = new PrismaClient().refreshTokens

module.exports = {
  setToken: async function (data) {
    try {
      const refToken = await refTokenClient.create({ data })
      if (refToken) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by set token",
      }
    }
  },
  deleteToken: async function (token) {
    try {
      const refTokenDeleted = await refTokenClient.delete({
        where: { token: token },
      })
      if (refTokenDeleted) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by delete token",
      }
    }
  },
  refTokenExists: async function (token) {
    try {
      const refToken = await refTokenClient.findFirst({
        select: { id: true, token: true },
        where: { token: token },
      })
      if (refToken) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by search token",
      }
    }
  },
}
