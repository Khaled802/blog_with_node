const CError = require('./customeError');
const { ReasonPhrases } = require('http-status-codes')

module.exports.wrapIt = (func) => {
    return async (req, res, next) => {
        try {
            return await func(req, res, next);
        } catch(err) {
            if (err.statusCode === undefined) {
                // throw new CError(ReasonPhrases.INTERNAL_SERVER_ERROR);
                throw new CError(err.message);
            }
            throw err;
        }
    }
}