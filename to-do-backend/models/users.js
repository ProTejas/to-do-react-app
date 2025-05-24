const mongoose = require('mongoose');

//Schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        title: { type: String, required: true },
        status: { type: String, default: "pending" }
    }]
});

//Model 
const User = mongoose.model("user", userSchema);

module.exports = User;