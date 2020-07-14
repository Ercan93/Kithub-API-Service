const express = require("express");
const router = express.Router();
const Book = require("../models/BookSchema");

const subRouter = express.Router({ mergeParams: true });
router.use("/:category_name/sort", subRouter);

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

/* GET Sort categories books by parameter values. */
subRouter.get("/:sort_param=:orderBy", (req, res) => {
  let categoryName = req.params.category_name;
  categoryName = categoryName.replace("_", " ");
  let sort_param = req.params.sort_param;

  let orderBy = req.params.orderBy;
  if (orderBy == "asc") orderBy = 1;
  else if (orderBy == "desc") orderBy = -1;

  if (
    ["readCount", "likeCount", "pageNum"].includes(sort_param) &&
    [-1, 1].includes(orderBy)
  ) {
    let sortQuery = {};
    sort_param = "properties." + sort_param;
    sortQuery[sort_param] = orderBy;

    Book.find({
      "properties.Category": { $in: [categoryName, " " + categoryName] },
    })
      .sort(sortQuery)
      .limit(30)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } else {
    res.json("False sort parameter!");
  }
});
module.exports = router;
