const Book = require("../models/Book")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const db = require("../index")
const BookRental = require("../models/BookRental")

module.exports = {
  findAllBookRentals: async function () {
    try {
      const books = await Book.findAll({
        attributes: ["id", "bookname"], // was du sehen willst
        include: [
          {
            model: BookRental,
            attributes: ["id", "readername", "rentaldate"],
            required: false, // wichtig: damit auch nicht ausgeliehene Bücher angezeigt werden
          },
        ],
      })

      return books || []
    } catch (error) {
      console.log(error)
      return []
    }
  },
  findBookRentalByBookId: async function (bookid) {
    try {
      const bookrental = await BookRental.findOne({
        attributes: ["bookid", "readername", "rentaldate"],
        where: {
          bookid: parseInt(bookid, 10),
        },
      }).catch((error) => [])
      if (bookrental) {
        return bookrental
      } else {
        return false
      }
    } catch (error) {
      console.log("findBookRentalByBookId: " + error)
      return false
    }
  },
  findBookRentalById: async function (rentalid, bookid) {
    try {
      const bookrental = await BookRental.findOne({
        attributes: ["bookid", "readername", "rentaldate"],
        where: {
          bookid: parseInt(bookid, 10),
          id: parseInt(rentalid, 10),
        },
      }).catch((error) => [])
      if (bookrental) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log("findBookRentalById: " + error)
      return false
    }
  },
  createBookRental: async function (data) {
    try {
      const newBookRental = await BookRental.create(data)
      if (newBookRental && newBookRental.id) {
        return newBookRental.id
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
  deleteBookRental: async function (rentalid) {
    try {
      const deleted = await BookRental.destroy({
        where: {
          id: parseInt(rentalid, 10),
        },
      })
      if (deleted) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log("deleteBookRental: " + error)
      return false
    }
  },
}
