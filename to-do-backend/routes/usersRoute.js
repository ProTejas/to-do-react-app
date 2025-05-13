const express = require('express');
const router = express.Router();

// ✅ POST route to create a new user
router.post('/api/users', async (req, res) => {
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

router.get('/api/users', async (req, res) => {
    const allUsers = await User.find({});
    return res.status(200).send(allUsers);

});

router.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.params.email);

    return res.status(200).send(user);

});

module.exports = router;
