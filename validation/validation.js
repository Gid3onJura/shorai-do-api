const Joi = require("joi")

const validation = (schema, property) => {
  return (request, response, next) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: false, // ignore unknown props
      stripUnknown: false, // remove unknown props
    }
    const { error } = schema.validate(request[property], options)
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(",")

      console.log("error", message)
      return response.status(400).json({ error: message })
    }
  }
}
module.exports = validation
