const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authValidator = (data) => {
    // const data = jwt.verify(token, process.env.SECRET_KEY, {algorithms: ['HS256']});
    const rule = Joi.object({
        email: Joi.string().min(6).max(225).required().email(),
        username: Joi.string().min(6).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,50}$')).required(),
        role: Joi.string().min(4).max(5)
    });

    return rule.validate(data);
}

module.exports.authValidator = authValidator;