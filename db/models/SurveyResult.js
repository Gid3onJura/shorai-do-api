const Sequelize = require("sequelize")
const db = require("../index")
const Survey = require("./Survey")

const SurveyResult = db.define("surveyresults", {
  answers: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  surveyId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

SurveyResult.belongsTo(Survey, {
  foreignKey: "surveyId",
  as: "survey",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})

module.exports = SurveyResult
