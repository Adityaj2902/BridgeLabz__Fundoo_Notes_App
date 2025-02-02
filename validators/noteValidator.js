const Joi = require('joi');

const noteValidator = Joi.object({
    notetitle: Joi.string().required().messages({
        'string.base': 'Note title must be a string',
        'string.empty': 'Note title is required',
        'any.required': 'Note title is required'
    }),
    notedata: Joi.string().required().messages({
        'string.base': 'Note description must be a string',
        'string.empty': 'Note description is required',
        'any.required': 'Note description is required'
    }),
    backgroundColor: Joi.string().optional().messages({
        'string.base': 'Background must be a valid string',
    })
});

module.exports = noteValidator;
