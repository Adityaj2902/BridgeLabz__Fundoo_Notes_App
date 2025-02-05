const userValidator = require('../validators/user');
const Joi = require('joi');


const validateUser = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }
    next();
};


module.exports=validateUser;