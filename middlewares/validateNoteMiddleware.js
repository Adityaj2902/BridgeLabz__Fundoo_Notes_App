const noteValidator = require('../validators/noteValidator');
const Joi = require('joi');

// Middleware to validate note data using Joi
const validateNote = (req, res, next) => {
    const { error } = noteValidator.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((err) => err.message).join(', '),
        });
    }

    next(); // Proceed to the controller if validation passes
};

module.exports = validateNote;
