var express = require('express');
var router = express.Router();
const Book = require('../models/BookSchema')


/* GET book with book name. */
router.get('/:book_name', (req, res) => {
    let bookName = req.params.book_name
    bookName = bookName.replace("_", " ")
    Book.find({ "properties.bookName": bookName })
        .then(
            data => res.json(data)
        )
        .catch(
            err => res.json(err)
        )
});

/* GET book with book Id. */
router.get('/:book_id', (req, res) => {
    Book.findById(req.params.book_id)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
module.exports = router;
