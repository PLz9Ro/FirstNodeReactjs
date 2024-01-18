
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50,
    },
    phone: {
        type: Number,
        minlength: 10,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    admin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
)
const User = mongoose.model('User', userSchema);
module.exports = User;