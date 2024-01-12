const { check,body } = require('express-validator');

const registerValidationRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phoneNumber').trim().isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'),
]

const loginValidationRules = [
    body('email').trim().isEmail().withMessage('email is required'),
    body('password').isLength({ min: 6 }).withMessage('password is required'),
]


module.exports = { registerValidationRules,loginValidationRules }