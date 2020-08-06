const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:12,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength:25,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,

  },
});

module.exports = mongoose.model("userSchema", UserSchema);
