const express = require('express');
const { handleGetAllUsers, createNewUser, authanticateUser, updateTask } = require('../controllers/user');
const User = require('../models/users');
const router = express.Router();


// Create a new user
router.post('/', createNewUser);

//Log IN
router.post('/login', authanticateUser);

//Update tasks
router.patch('/updateTasks', updateTask);

// Get all users
router.get('/', handleGetAllUsers);

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
