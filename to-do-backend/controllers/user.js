const User = require("../models/users");

async function handleGetAllUsers(req, res) {
    try {
        const alldbUsers = await User.find({});
        return res.json(alldbUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
}

async function createNewUser(req, res) {
    try {
        const { name, mobile, email, password } = req.body;

        // Validation
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Check for duplicate email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already exists" });
        }

        // Create user
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
}

async function authanticateUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ msg: "email required and password required" });
        }

        // Create user
        const userData = await User.find({
            email: email,
            password: password
        });

        console.log("User inserted:", userData);

        return res.status(200).json({ msg: "User Authenticate Successfully", user: userData });
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({ msg: "email required" });
        }

        // Create user
        const userData = await User.create({
            email: email,
            password: password
        });

        console.log("User inserted:", userData);

        return res.status(201).json({ msg: "User created successfully", user: userData });
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
}

module.exports = { handleGetAllUsers, createNewUser, authanticateUser };
