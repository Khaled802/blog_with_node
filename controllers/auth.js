const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const User = require('../models/users');
const {wrapIt} = require('../errors/errorWrapper');
const { validate } = require('./helpers/general');
const CError = require('../errors/customeError');
const { generateToken } = require('./helpers/token')

module.exports.register = async (req, res, next) => {
    validate(req, res);

    const { email, username, password } = req.body;

    await wrapIt(
        async () => {
            const user = await User.create({ email, username, password });
            return res.status(StatusCodes.OK).json(user);
        }
    );   
}


module.exports.login = async (req, res, next) => {
    validate(req, res);

    const { email, password } = req.body;

    await wrapIt(
        async () => {
            const user = await User.findOne({ email });
            if (user == null) {
                throw new CError('user with this email is not found', StatusCodes.NOT_FOUND);
            }
            if (!user.isCorrectPassword(password)) {
                throw new CError('the password is wrong', StatusCodes.BAD_REQUEST);
            }
            const jwtToken = await generateToken({ id: user._id, email: user.email });
            res.status(StatusCodes.OK).json({ jwtToken });
        }
    )
}