const express = require("express");
const router = express.Router();
const Book = require("../models/BookSchema");

const subRouter = express.Router({ mergeParams: true });
router.use("/:categories_name/sort", subRouter);

/* GET categories books with categories name */
router.get("/:categories_name", (req, res) => {
  let categories_name = req.params.categories_name;
  categories_name = categories_name.split("&");

  categories_name.forEach((item, index) => {
    categories_name[index] = item.replace("_", " ");
  });

  Book.find({
    "properties.Category": {
      $all: categories_name,
    },
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
