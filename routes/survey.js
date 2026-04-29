const express = require("express")
const router = express.Router()
const Sequelize = require("sequelize")
const Survey = require("../db/models/Survey")
const { authenticateToken } = require("../middleware/authenticateToken")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const surveyresultController = require("../db/controller/surveyresult")
const userController = require("../db/controller/users")

/**
 * get all surveys that are not expired (deadline in the future or no deadline)
 */
router.get("/", async (request, response) => {
  try {
    const surveys = await Survey.findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            deadline: {
              [Sequelize.Op.gt]: new Date(),
            },
          },
          {
            deadline: null,
          },
        ],
      },
      order: [["deadline", "ASC"]],
    })

    const formatted = surveys.map((item) => ({
      id: item.id,
      deadline: item.deadline ?? null,
      survey: item.survey ? JSON.parse(item.survey) : null,
    }))

    return response.status(200).send(formatted)
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "could not load surveys",
    })
  }
})

/**
 * get survey by id
 */
router.get("/:id", async (request, response) => {
  try {
    const survey = await Survey.findOne({
      where: {
        id: request.params.id,
      },
    })

    const formatted = {
      id: survey.id,
      deadline: survey.deadline ?? null,
      survey: survey.survey ? JSON.parse(survey.survey) : null,
    }

    return response.status(200).send(formatted)
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "could not load surveys",
    })
  }
})

/**
 * get survey by id
 */
router.get("/:id/stats", async (request, response) => {
  try {
    const survey = await Survey.findOne({
      where: {
        id: request.params.id,
      },
    })

    if (!survey) {
      return response.status(404).send({
        message: "survey not found",
      })
    }

    // get all answers and make a stats object with the count of each answer for each question
    const answers = await surveyresultController.getAnswersBySurveyId(request.params.id)

    const stats = {}

    answers.forEach((answer) => {
      const parsedAnswers = JSON.parse(answer.answers)
      for (const question in parsedAnswers) {
        if (!stats[question]) {
          stats[question] = {}
        }
        const answerValue = parsedAnswers[question]
        if (Array.isArray(answerValue)) {
          // Für Multiselect: jede Option separat zählen
          answerValue.forEach((option) => {
            if (!stats[question][option]) {
              stats[question][option] = 0
            }
            stats[question][option]++
          })
        } else {
          // Für Single-Select: als einzelne Antwort zählen
          if (!stats[question][answerValue]) {
            stats[question][answerValue] = 0
          }
          stats[question][answerValue]++
        }
      }
    })

    const userWithRoleUser = []
    const allUsers = await userController.findAllUser()
    allUsers.forEach(async (user, index, array) => {
      const userId = user.dataValues.id
      if (user.dataValues.roles.includes("user")) {
        userWithRoleUser.push(user)
      }
    })

    const participationAverageUser = (userWithRoleUser.length / answers.length) * 100

    const responseBody = {
      stats,
      totalResponses: answers.length,
      participationAverageUser,
    }

    return response.status(200).send(responseBody)
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "could not load surveys",
    })
  }
})

/**
 * create new survey
 */
router.post("/", authenticateToken, validation(schemas.createSurvey, "body"), async (request, response) => {
  const { survey, deadline } = request.body

  if (typeof survey !== "object" || survey === null || Array.isArray(survey)) {
    return response.status(400).send({
      message: "survey must be a JSON object",
    })
  }

  try {
    const newSurvey = await Survey.create({
      deadline: deadline ? new Date(deadline) : null,
      survey: JSON.stringify(survey),
    })

    return response.status(201).send({
      id: newSurvey.id,
    })
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "survey not created",
    })
  }
})

/**
 * complete survey
 */
router.post("/complete", async (request, response) => {
  const { id, answers } = request.body

  if (typeof answers !== "object" || answers === null || Array.isArray(answers)) {
    return response.status(400).send({
      message: "answers must be a JSON object",
    })
  }

  try {
    const survey = await Survey.findOne({
      where: {
        id: id,
      },
    })

    if (!survey) {
      return response.status(404).send({
        message: "survey not found",
      })
    }

    // save to database
    const newAnswers = await surveyresultController.saveAnswers({
      surveyId: id,
      answers: JSON.stringify(answers),
    })
    if (newAnswers) {
      return response.status(201).send({ id: newAnswers })
    } else {
      return response.status(500).send({
        message: "answers not saved",
      })
    }
  } catch (error) {
    console.log(error)
    return response.status(500).send({
      message: "could not complete survey",
    })
  }
})

module.exports = router
