const User = require('../../models/users');
const { StatusCodes } = require('http-status-codes');
const CError = require('../../errors/customeError');
const { isValidObjectId } = require('mongoose')



module.exports.getCurrentUserOrError = async (req) => {
    if (req.user == null) {
        throw new CError('there is no user', StatusCodes.UNAUTHORIZED);
    }
    const userId = req.user.id;
    if (userId === undefined) {
        throw new CError('there is a problem with user information', StatusCodes.CONFLICT);
    }

    return await this.getUserOrError(userId);
}


module.exports.getUserOrError = async(userId) => {
    if(!isValidObjectId(userId)) {
        throw new CError('user not found', StatusCodes.NOT_FOUND);
    }

    const user = await User.findById(userId);
    if (user == null) throw new CError('user not found', StatusCodes.NOT_FOUND);

    return user
}