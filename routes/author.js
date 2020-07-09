var express = require("express");
var router = express.Router();
const Book = require("../models/BookSchema");

const subRouter = express.Router({ mergeParams: true });
router.use("/:author_name/sort", subRouter);

/* GET author's book with author name */
router.get("/:author_name", (req, res) => {
  let authorName = req.params.author_name;
  authorName = authorName.replace("_", " ");
  Book.find({ "properties.authorName": authorName })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
/* GET Sort author's books by parameter values. */
subRouter.get("/:sort_param/:orderBy", (req, res) => {
  let authorName = req.params.author_name;
  authorName = authorName.replace("_", " ");
  let sort_param = req.params.sort_param;
  let orderBy = req.params.orderBy;
  orderBy = parseInt(orderBy);

  if (
    ["readCount", "likeCount", "pageNum"].includes(sort_param) &&
    [-1, 1].includes(orderBy)
  ) {
    let sortQuery = {};
    sort_param = "properties." + sort_param;
    sortQuery[sort_param] = orderBy;

    Book.find({ "properties.authorName": authorName })
      .sort(sortQuery)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } else {
    res.json("False sort parameter!");
  }
});
module.exports = router;
