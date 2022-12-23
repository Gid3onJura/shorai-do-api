require("dotenv").config();

exports.resolveApiKey = (request, response, next) => {
  if (
    request.headers &&
    request.headers["api-key"] &&
    request.headers["api-key"] === process.env.API_KEY
  ) {
    next();
  } else {
    return response.status(403).send({});
  }
};
