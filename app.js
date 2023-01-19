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
    ],
    origin: ["*"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
    credentials: true,
  })
)
//app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(resolveApiKey)

// set header to all responses
app.use(function (request, response, next) {
  response.setHeader("Content-Type", "application/json")
  response.setHeader("Access-Control-Allow-Origin", ["*"])
  response.setHeader("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE", "OPTIONS"])
  next()
})

//const mockUser = require('./mock/user.json');

//app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`))

https
  .createServer(
    {
      key: fs.readFileSync("./security/key.pem"),
      cert: fs.readFileSync("./security/cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`it's alive on ${BASE_URL}:${PORT}`)
  })

// test routes
app.use("/", require("./routes/test"))

// user routes
app.use("/user", require("./routes/users"))

// auth routes
app.use("/", require("./routes/auth"))
