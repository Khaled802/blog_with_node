const { getToken, verifyToken } = require('../controllers/helpers/token');
const { StatusCodes } = require('http-status-codes');
const { wrapIt} = require('../errors/errorWrapper');
const CError = require('../errors/customeError')

SAVE_METHODS = ['GET']

module.exports.isAuth = async (req, res, next)=> {
    await wrapIt(
        async () => {
            const token = await getToken(req);
            const result = await verifyToken(token)
            if (typeof result === 'string') {
                throw new CError(result, StatusCodes.UNAUTHORIZED);
            }
            req.user = result;
            return next();
        }
    );
}

module.exports.isCreatorOrReadOnly = async (req, res, next, creatorId) => {
    await wrapIt(
        async ()=> {
            console.log(req.method in SAVE_METHODS);
            if (SAVE_METHODS.includes(req.method)) {
                return
            }

            const id = req.user.id;
            if (creatorId != id) {
                throw new CError('You don\'t have the permission for this operation', StatusCodes.FORBIDDEN);
            }
            return
        }
    )
}