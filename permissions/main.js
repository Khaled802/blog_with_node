const { getToken, verifyToken } = require('../controllers/helpers/token');
const { StatusCodes } = require('http-status-codes');
const { wrapIt} = require('../errors/errorWrapper');
const CError = require('../errors/customeError')

SAVE_METHODS = ['GET']

module.exports.isAuth = async (req, res, next)=> {
    const token = await getToken(req);
    const result = await verifyToken(token);
    req.user = result;
    return next();
}

module.exports.isCreatorOrReadOnly = async (req, res, next, creatorId) => {
    if (SAVE_METHODS.includes(req.method)) {
        return
    }

    const id = req.user.id;
    if (creatorId != id) {
        throw new CError('You don\'t have the permission for this operation', StatusCodes.FORBIDDEN);
    }
    return
}