const express = require("express")
require("dotenv").config()
const md5 = require("md5")
const router = express.Router()

const bookrentalController = require("../db/controller/bookrental")
const schemas = require("../validation/schemas")
const validation = require("../validation/validation")
const { authenticateToken } = require("../middleware/authenticateToken")

router.get("/", authenticateToken, async (request, response) => {
  const findBookRentals = await bookrentalController.findAllBookRentals()
  if (findBookRentals) {
    return response.send(findBookRentals).status(200)
  } else {
    return response.status(404).send()
  }
})

router.post("/", authenticateToken, validation(schemas.createBookRental, "body"), async (request, response) => {
  const requestBody = request.body

  const bookid = requestBody.bookid

  // check if book is already rented
  const existingBookRental = await bookrentalController.findBookRentalByBookId(bookid)

  if (existingBookRental) {
    return response.status(200).send({
      status: 409,
      message: "book is already rented",
    })
  }

  // create new book rental
  const newBookRental = await bookrentalController.createBookRental(requestBody)

  if (newBookRental) {
    return response.status(201).send({ newbookrental: newBookRental })
  } else {
    return response.status(400).send({
      message: "book not rent",
    })
  }
})

router.delete("/", authenticateToken, validation(schemas.deleteBookRental, "body"), async (request, response) => {
  const requestBody = request.body

  const rentalid = requestBody.rentalid
  const bookid = requestBody.bookid

  // check if book is already rented
  const existingBookRental = await bookrentalController.findBookRentalById(rentalid, bookid)

  if (!existingBookRental) {
    return response.status(404).send({
      message: "book rental not found",
    })
  }

  // delete book rental
  const deletedBookRental = await bookrentalController.deleteBookRental(rentalid)

  if (deletedBookRental) {
    return response.status(200).send({})
  } else {
    return response.status(404).send({
      message: "book rental not deleted",
    })
  }
})

module.exports = router
