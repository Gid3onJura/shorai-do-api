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
      return true
    }
  })
}

async function sendMail(transporter, to, resetCode) {
  const info = await transporter.sendMail({
    from: '"SDKM-Merseburg" <info@merseburg-shorai-do-kempo.de>', // sender address
    to: to, // list of receivers
    subject: "Code zum Zurücksetzen des Passwortes", // Subject line
    text:
      "Hallo Schüler. Für das Zurücksetzen deines Passwortes, gib folgenden Code " +
      resetCode +
      " in der App ein und vergebe dir ein neues Passwort.", // plain text body
    html:
      "Hallo Schüler. Für das Zurücksetzen deines Passwortes, gib folgenden Code <b>" +
      resetCode +
      "</b> in der App ein und vergebe dir ein neues Passwort.", // html body
  })

  return info
}

module.exports = { generateResetCode, createMailTransporter, verifyConnection, sendMail }
