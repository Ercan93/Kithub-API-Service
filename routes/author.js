var express = require("express");
var router = express.Router();
const Book = require("../models/BookSchema");

/* GET author's book with author name */
router.get("/:author_name", (req, res) => {
  let authorName = req.params.author_name;
  authorName = authorName.replace("_", " ");
  Book.find({ "properties.authorName": authorName })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
