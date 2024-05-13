const { body } = require('express-validator')

const jsonBodySignup = [
    body('user_name')
        .not()
        .isEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage('Min length is 2 and Max length is 50'),

    body('user_email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Real email is Requred'),

    body('user_password')
        .not()
        .isEmpty()
        .isLength({ min: 10, max: 50 })
        .withMessage('Min length is 10 and Max length is 50'),

    body('user_date')
        .isISO8601()
        .withMessage('Date is Requred YYYY-MM-DD'),
]

module.exports = jsonBodySignup;