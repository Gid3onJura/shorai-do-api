const { PrismaClient } = require("@prisma/client")

const rankClient = new PrismaClient().ranks

module.exports = {
  rankExists: async function (data) {
    try {
      const rank = await rankClient.findFirst({
        select: { id: true },
        where: { rank: data.rank, category: data.category, color: data.color, user: data.user },
      })
      if (rank) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by rank exists",
      }
    }
  },
  rankExistsById: async function (id) {
    try {
      const rank = await rankClient.findFirst({
        select: { id: true },
        where: { id: id },
      })
      if (rank) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by get rank by id",
      }
    }
  },
  createRank: async function (data) {
    try {
      const newRank = await rankClient.create({ data: data })
      if (newRank) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by create rank",
      }
    }
  },
  updateRank: async function (data, rankId) {
    try {
      const affectedRows = await rankClient.update({
        data: { rank: data.rank, category: data.category, color: data.color, graduatedon: data.graduatedon },
        where: {
          id: rankId,
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
        message: error?.meta?.cause || "database error by update rank",
      }
    }
  },
  deleteRank: async function (id) {
    try {
      const deletedRank = await rankClient.delete({
        where: { id: id },
      })
      if (deletedRank) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: error?.meta?.cause || "database error by delete rank",
      }
    }
  },
}
