const Joi = require('joi')
const schemas = {
    createUser: Joi.object().keys({
        nickname: Joi.string().required(),
        password: Joi.string().min(6).required()
    }),
    loginUser: Joi.object().keys({
        nickname: Joi.string().required(),
        password: Joi.string().min(6).required()
    }),
    refreshToken: Joi.object().keys({
        token: Joi.string().required()
    }),
    logout: Joi.object().keys({
        token: Joi.string().required()
    })
};
module.exports = schemas;