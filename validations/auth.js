const { body } = require('express-validator');
const User = require('../models/users');

module.exports.standardUser = [
    body('email')
        .isEmail().withMessage('should write email correctly')
        .normalizeEmail()
        .custom(async value=>{
            if (await User.isEmailFound(value)) {
                throw new Error('E-mail already in use');
            }
        }),
        
    body('username')
        .isString().withMessage('username should be string')
        .trim()
        .isLength({min: 4}).withMessage('username is so short'),
    body('password')
        .isLength({min: 7}).withMessage('password is too short')
]


module.exports.loginUser = [
    body('email')
    .isEmail().withMessage('should write email correctly')
    .normalizeEmail(),
    
    body('password')
        .isLength({min: 7}).withMessage('password is too short')
]