const express = require('express')
const router = express.Router()
const Book = require('../models/BookSchema')

/* GET category books with category name */
router.get('/:category_name', (req, res) => {
    let category_name = req.params.category_name
    Book.find({ " properties.Category": { $in: [category_name, " " + category_name] } })
        .limit(30)
        .then(data => res.json(data))
        .catch(err => res.json(err))
})

module.exports = router;