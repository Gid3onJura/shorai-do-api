const Exam = require("../models/Exam")

module.exports = {
  findAllExamsFromUser: async function (userId) {
    try {
      const exams = await Exam.findAll({
        attributes: ["rank", "category", "color", "user", "graduatedon"],
        where: { user: userId },
        order: [["rank", "ASC"]],
      }).catch((error) => [])
      if (exams && exams.length > 0) {
        return exams
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
      return []
    }
  },
  examExists: async function (data) {
    try {
      const exam = await Exam.findOne({
        attributes: ["id"],
        where: { rank: data.rank, category: data.category, color: data.color, user: data.user },
      })
      if (exam) {
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
  createExam: async function (data) {
    try {
      const newExam = await Exam.create(data)
      if (newExam) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
  updateExam: async function (data) {
    try {
      const affectedRows = await Exam.update(data, {
        where: {
          id: data.id,
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
