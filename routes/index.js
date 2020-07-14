var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
var jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Kitap API Hizmetine Hoşgeldiniz \n Ercan UZUNSAKAL",
  });
});

/* POST User register method */
router.post("/register", (req, res, next) => {
  const { email, username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      email,
      username,
      password: hash,
    });
    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  });
});

router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        status: false,
        message: "Authentication failed, user not found.",
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: "Authentication failed, wrong password.",
          });
        } else {
          const payload = { username };
          const token = jwt.sign(payload, process.env.api_crypt_key);
          res.json({
            status: true,
            token,
          });
        }
      });
    }
  });
});
module.exports = router;
