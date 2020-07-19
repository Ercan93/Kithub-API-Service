var express = require("express");
var router = express.Router();
const Book = require("../models/BookSchema");

/* GET book with book name. */
router.get("/:book_name", (req, res) => {
  let bookName = req.params.book_name;
  bookName = bookName.replace("_", " ");
  Book.find({ "properties.bookName": bookName })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

/* GET Book with ISBN number. */
router.get("/ISBN/:book_ISBN", (req, res) => {
  let ISBN = req.params.book_ISBN;
  Book.find({ "properties.ISBN": ISBN })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
module.exports = router;
