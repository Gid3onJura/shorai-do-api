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
  updateRank: async function (data) {
    try {
      const affectedRows = await Exam.update(
        { rank: data.rank, category: data.category, color: data.color, graduatedon: data.graduatedon },
        {
          where: {
            id: data.examid,
          },
        }
      )
      if (affectedRows && affectedRows[0] >= 1) {
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
      const deletedExam = await Exam.destroy({
        where: { id: id },
      })
      if (deletedExam) {
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
