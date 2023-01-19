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
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: ["*"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    preflightContinue: false,
    credentials: true,
  })
)
//app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(resolveApiKey)

//const mockUser = require('./mock/user.json');

app.listen(PORT, () => console.log(`it's alive on ${BASE_URL}:${PORT}`))
/*
https
  .createServer(
    {
      key: fs.readFileSync("./security/server.key"),
      cert: fs.readFileSync("./security/server.cert"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`it's alive on ${BASE_URL}:${PORT}`)
  })
  */

// test routes
app.use("/", require("./routes/test"))

// user routes
app.use("/user", require("./routes/users"))

// auth routes
app.use("/", require("./routes/auth"))
