const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 8,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 12,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlenght: 12,
  },
});

module.exports = mongoose.model("userSchema", UserSchema);
