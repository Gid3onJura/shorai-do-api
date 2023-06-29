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
      const updatedRank = await Rank.update(data, {
        where: {
          user: data.user,
        },
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
}
