const Sequelize = require("sequelize")
const db = require("../index")
const User = require("./User")

const BookRental = db.define("bookrentals", {
  bookid: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rentaldate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  reservationdate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
})

BookRental.hasMany(User, {
  foreignKey: "id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})

module.exports = BookRental
