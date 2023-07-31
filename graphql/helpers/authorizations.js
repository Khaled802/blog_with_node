const CError = require('../../errors/customeError');
const { StatusCodes } = require('http-status-codes')

module.exports.isCreatorORthrowError = (obj, user) => {
    console.log(user, obj.creatorId);
    if (user.id !== obj.creatorId) 
        throw new CError('not allowed for the user', StatusCodes.FORBIDDEN)
    return true
}