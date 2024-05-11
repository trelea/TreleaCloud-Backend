const Joi = require('joi');

const jsonBodySignup = (jsonBody) => {
    const body = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().email().required(),
        user_password: Joi.string().min(10).max(20),
        user_date: Joi.date()
    })
    return body.validate(jsonBody)
}

module.exports = jsonBodySignup;
