// validators/userValidation.js
const Joi = require('joi');

const registerValidation = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': 'First name must be a string',
        'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name must be a string',
        'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Valid email is required',
        'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required',
    }),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Valid email is required',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a string',
        'any.required': 'Password is required',
    }),
});

module.exports = { registerValidation, loginValidation };

