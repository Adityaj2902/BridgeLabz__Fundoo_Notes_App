
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validators/user'); // path to validation schemas
const Joi = require('joi');

const router = express.Router();

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }
    next();
};

// Register User
router.post('/register', validate(registerValidation), registerUser);

// Login User
router.post('/login', validate(loginValidation), loginUser);

module.exports = router;
