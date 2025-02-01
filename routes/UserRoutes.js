const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');


const router = express.Router();

// Register User

router.post('/register', registerUser);

// Login route

router.post('/login', loginUser);


module.exports = router;
