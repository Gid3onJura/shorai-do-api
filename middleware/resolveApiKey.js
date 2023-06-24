require("dotenv").config()

exports.resolveApiKey = (request, response, next) => {
  // for testing api alive
  if (request.originalUrl === "/alive") {
    next()
  } else if (request.headers && request.headers["api-key"] && request.headers["api-key"] === process.env.API_KEY) {
    next()
  } else {
    return response.status(403).send({})
  }
}
