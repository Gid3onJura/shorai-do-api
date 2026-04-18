const express = require("express")
const router = express.Router()
const Sequelize = require("sequelize")
const Survey = require("../db/models/Survey")
const { authenticateToken } = require("../middleware/authenticateToken")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")

router.get("/", authenticateToken, async (request, response) => {
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

module.exports = router
