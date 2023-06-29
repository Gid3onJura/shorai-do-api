const Rank = require("../models/Ranks")

module.exports = {
  createRank: async function (data) {
    try {
      const newRank = await Rank.create(data)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
  updateRank: async function (data) {
    try {
      const affectedRows = await Rank.update(data, {
        where: {
          user: data.user,
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
}
