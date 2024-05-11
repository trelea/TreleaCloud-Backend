const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 100
    },
    user_email: {
        type: String,
        unique: true,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_date: {
        type: Date,
        required: true
    }
}, { timestamps: true })


const User = mongoose.model('User', userSchema)
module.exports = User