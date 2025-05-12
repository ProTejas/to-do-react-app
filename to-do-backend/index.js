const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mongo Connect
mongoose.connect('mongodb://127.0.0.1:27017/to-do-app')
    .then(() => console.log('mongo db connected'))
    .catch((err) => console.log('Monog Error', err));

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


// ✅ POST route to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;

        // ✅ Validation
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // ✅ Create User
        const userData = await User.create({
            fullName: name,
            mobileNumber: mobile,
            email: email,
            password: password
        });

        console.log("User inserted:", userData);

        return res.status(201).json({ msg: "User created successfully", user: userData });
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
});
app.listen('8000', () => console.log('server connected'));



