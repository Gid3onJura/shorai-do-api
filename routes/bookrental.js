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
  const userid = requestBody.userid
  const rentaldate = requestBody.rentaldate ?? null
  const reservationdate = requestBody.reservationdate ?? null

  // check if book is already rented
  const existingBookRental = await bookrentalController.findBookRentalByBookId(bookid)

  if (rentaldate) {
    //#region rental
    if (existingBookRental && existingBookRental.rentaldate) {
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
  } else if (reservationdate) {
    //#region reservation
    if (existingBookRental && existingBookRental.reservationdate) {
      return response.status(200).send({
        status: 409,
        message: "book is already reserved",
      })
    }

    // create new book reservation
    const newBookReservation = await bookrentalController.createBookRental(requestBody)

    if (newBookReservation) {
      return response.status(201).send({ newbookrental: newBookReservation })
    } else {
      return response.status(400).send({
        message: "book not reserved",
      })
    }
  } else {
    return response.status(400).send({
      message: "das Buch ist weder als ausgeliehen noch reserviert markiert",
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
