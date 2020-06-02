const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_NAME}.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('open', () => {
        console.log("mongoose connected to MongoDB")
    })
    mongoose.connection.on('error', (err) => {
        console.log("mongoose not connected to MongoDB! ", err);
    })
}