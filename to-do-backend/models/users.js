const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

//Model 
const User = mongoose.model("user", userSchema);

module.exports = User;