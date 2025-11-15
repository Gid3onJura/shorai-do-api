const Sequelize = require("sequelize")
const db = require("../index")
const Book = require("./Book")

const BookRental = db.define("bookrentals", {
  bookid: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  readername: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rentaldate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

module.exports = BookRental
