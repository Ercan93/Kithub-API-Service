var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var indexRouter = require("./routes/index");
var booksRouter = require("./routes/book");
var authorRouter = require("./routes/author");
var categoryRouter = require("./routes/category");

var app = express();

//MongoDB connection
const db = require("./helper/db");
db();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", verifyToken);
app.use("/api/books", booksRouter);
app.use("/api/author", authorRouter);
app.use("/api/category", categoryRouter);

module.exports = app;
