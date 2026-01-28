const Sequelize = require("sequelize")
const db = require("../index")
const BookRental = require("./BookRental")

const Book = db.define("books", {
  bookname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Book.hasOne(BookRental, {
  foreignKey: "bookid",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})

module.exports = Book
