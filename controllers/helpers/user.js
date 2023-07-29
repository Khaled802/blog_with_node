const User = require('../../models/users');
const { StatusCodes } = require('http-status-codes');
const CError = require('../../errors/customeError');



module.exports.getCurrentUserOrError = async (req) => {
    const userId = req.user.id;
    if (userId === undefined) {
        throw new CError('there is a problem with user information', StatusCodes.CONFLICT);
    }

    return await this.getUserOrError(userId);
}


module.exports.getUserOrError = async(userId) => {
    const user = await User.findById(userId);

    if (user == null) throw new CError('user not found', StatusCodes.NOT_FOUND);

    return user
}