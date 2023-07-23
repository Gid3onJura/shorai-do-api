const fs = require("fs")
const https = require("https")
const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { resolveApiKey } = require("./middleware/resolveApiKey")

const app = express()
const PORT = process.env.PORT || 3000
const BASE_URL = process.env.BASE_URL || "http://localhost"

app.use(
  cors({
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
      "api-key",
    ],
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    preflightContinue: false,
    credentials: true,
  })
)
// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(resolveApiKey)

// set header to all responses
app.use(function (request, response, next) {
  response.setHeader("Content-Type", "application/json")
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH")
  response.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
  response.setHeader("Access-Control-Allow-Credentials", true)
  next()
})

//const mockUser = require('./mock/user.json');

app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`))

// auth routes
app.use("/", require("./routes/auth"))

// user routes
app.use("/user", require("./routes/users"))

// event routes
app.use("/event", require("./routes/events"))

// test routes
app.use("/", require("./routes/test"))
