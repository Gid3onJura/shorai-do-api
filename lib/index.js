const nodemailer = require("nodemailer")

/**
 * generate six digit random number
 *
 * @returns integer
 */
async function generateResetCode() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
}

/**
 * create mail transporter from nodemailer
 *
 * @returns nodemailer transporter
 */
async function createMailTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // port: 587,
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PW,
    },
  })

  return transporter
}

async function verifyConnection(transporter) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error)
      return false
    } else {
      console.log("Server is ready to take our messages")
      return true
    }
  })
}

async function sendMail(transporter, to) {
  const info = await transporter.sendMail({
    from: '"SDKM-Merseburg" <info@merseburg-shorai-do-kempo.de>', // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  })

  return info
}

module.exports = { generateResetCode, createMailTransporter, verifyConnection, sendMail }
