const express = require("express");
const router = express.Router();
const Book = require("../models/BookSchema");
/* GET category books with category name */
router.get("/:category_name", (req, res) => {
  let categoryName = req.params.category_name;
  categoryName = categoryName.replace("_", " ");
  Book.find({
    "properties.Category": { $in: [categoryName, " " + categoryName] },
  })
    .limit(30)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
