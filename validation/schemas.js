const Joi = require("joi")
const schemas = {
  createUser: Joi.object().keys({
    nickname: Joi.string(),
    name: Joi.string().required(),
    password: Joi.string().min(6),
    email: Joi.string(),
    birth: Joi.date(),
    rank: Joi.number(),
    category: Joi.string(),
    color: Joi.string(),
    user: Joi.number(),
    graduatedon: Joi.date(),
  }),
  loginUser: Joi.object().keys({
    nickname: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
  refreshToken: Joi.object().keys({
    token: Joi.string().required(),
  }),
  logout: Joi.object().keys({
    token: Joi.string().required(),
  }),
  updateUser: Joi.object().keys({
    nickname: Joi.string(),
    name: Joi.string(),
    password: Joi.string().min(6),
    email: Joi.string(),
    birth: Joi.date(),
    rank: Joi.number(),
    category: Joi.string(),
    color: Joi.string(),
    graduatedon: Joi.date(),
    user: Joi.number().required(),
    activated: Joi.boolean(),
  }),
  createCalendarEvent: Joi.object().keys({
    eventdate: Joi.date().required(),
    eventcolor: Joi.string(),
    eventtype: Joi.string().required(),
    description: Joi.string().required(),
    override: Joi.boolean(),
    repeating: Joi.boolean(),
    repetitiontype: Joi.string().allow(""),
  }),
  updateCalendarEvent: Joi.object().keys({
    event: Joi.number().required(),
    eventdate: Joi.date(),
    eventcolor: Joi.string(),
    description: Joi.string(),
    override: Joi.boolean(),
    repeating: Joi.boolean(),
    repetitiontype: Joi.string(),
  }),
  createExam: Joi.object().keys({
    rank: Joi.number().required(),
    category: Joi.string().required(),
    color: Joi.string().required(),
    user: Joi.number().required(),
    graduatedon: Joi.date().required(),
  }),
}
module.exports = schemas
