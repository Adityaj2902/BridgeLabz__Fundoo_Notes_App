const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validators/user'); // path to validation schemas
const validateUser = require('../middlewares/validateUserMiddleware'); // middleware for validation

const router = express.Router();

// Register User
router.post('/register', validateUser(registerValidation), registerUser);

// Login User
router.post('/login', validateUser(loginValidation), loginUser);

module.exports = router;

