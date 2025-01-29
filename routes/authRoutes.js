const express = require('express');
const { registerUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');


const router = express.Router();

// Register User

router.post('/register', registerUser);

// Login route

router.post('/login', loginUser);


module.exports = router;
