const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 12,
    }
})

mondule.exports = mongoose.model('user', UserSchema)