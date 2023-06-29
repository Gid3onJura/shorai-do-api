const Joi = require("joi")
const schemas = {
  createUser: Joi.object().keys({
    nickname: Joi.string().required(),
    password: Joi.string().min(6).required(),
    birth: Joi.date(),
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
  createRank: Joi.object().keys({
    rank: Joi.number().required(),
    category: Joi.string().required(),
    color: Joi.string(),
    user: Joi.number().required(),
    graduatedon: Joi.date().required(),
  }),
}
module.exports = schemas
