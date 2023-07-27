const { body } = require('express-validator');

module.exports.standardPost = [
    body('title')
        .isString().withMessage('title should be string')
        .trim()
        .isLength({min: 5}).withMessage('content is so short'),
    body('content')
        .isString().withMessage('content should be string')
        .trim()
        .isLength({min: 5}).withMessage('content is so short'),
    body('imageUrl')
        .trim()
        .isURL().withMessage('URL should be correct')
]