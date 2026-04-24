const SurveyResult = require("../models/SurveyResult")

module.exports = {
  saveAnswers: async function (data) {
    try {
      const newAnswers = await SurveyResult.create(data)
      if (newAnswers && newAnswers.id) {
        return newAnswers.id
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
  getAnswersBySurveyId: async function (surveyId) {
    try {
      const answers = await SurveyResult.findAll({
        where: {
          surveyId: surveyId,
        },
      })
      return answers
    } catch (error) {
      console.log(error)
      return []
    }
  },
}
