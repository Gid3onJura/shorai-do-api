const RefToken = require("../models/RefreshToken")

module.exports = {
  setToken: async function (token) {
    try {
      const refToken = await RefToken.create({ token: token }, { fields: ["token"] })
      if (refToken) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: "database error by set token",
      }
    }
  },
  deleteToken: async function (token) {
    try {
      const refTokenDeleted = await RefToken.destroy({
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
        message: "database error by delete token",
      }
    }
  },
  refTokenExists: async function (token) {
    try {
      const refToken = await RefToken.findOne({
        attributes: ["id", "token"],
        where: { token: token },
      })
      if (refToken) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
