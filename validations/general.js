const { param } = require('express-validator');
const CError = require('../errors/customeError');
const { StatusCodes } = require('http-status-codes');

module.exports.validateObjectId = (Model) => {
    return [
        param('id')
            .isString().withMessage('string')
            .trim()
            .custom(async value=>{
                if (await Model.findById(value) == null) {
                    throw new CError(`object with id=${value} not found`, StatusCodes.NOT_FOUND);
                }
            })
    ]
}