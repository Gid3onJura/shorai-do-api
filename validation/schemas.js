const Joi = require('joi')
const schemas = {
    createUser: Joi.object().keys({
        nickname: Joi.string().required(),
        password: Joi.string().min(6).required()
    })
    // define all the other schemas below 
};
module.exports = schemas;