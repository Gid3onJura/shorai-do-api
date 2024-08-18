require("dotenv").config()

exports.apiState = (request, response, next) => {
  if (process.env.API_STATE == "SERVICE") {
    return response.status(900).send({
      message: "api is currently in maintenance",
    })
  }

  next()
}
