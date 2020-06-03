var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
const User = require('../models/UserSchema')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Kitap API Hizmetine Hoşgeldiniz' });
});

/* POST User register method */
router.post('/register', (req, res, next) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then(hash => {
        const user = new User({
            username,
            password: hash
        });
        user.save()
            .then(data => res.json(data))
            .catch(err => res.json(err))
    })
})
module.exports = router;
