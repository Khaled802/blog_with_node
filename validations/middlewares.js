const { validationResult } = require('express-validator');
const CError = require('../errors/customeError');

module.exports.validateMiddleware = (req, res, next) => {
    const valid_messages = validationResult(req);

    if (!valid_messages.isEmpty()) {
        throw new CError('validation problem', 403, valid_messages.array())
    }
    return next();
}