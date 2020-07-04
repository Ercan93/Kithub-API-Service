const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: Schema.Types.ObjectId,
  properties: {
    Category: [String],
    likeCount: Number,
    readCount: Number,
    explanation: String,
    pageNum: Number,
    printingDate: String,
    bookName: String,
    bookId: String,
    ISBN: String,
    authorName: String,
    name: String,
  },
});

module.exports = mongoose.model("bookSchema", BookSchema);
