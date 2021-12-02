const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
let userSchema = mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('users', userSchema)
//then must be imported to the index.js file with require and route
