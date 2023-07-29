const jwt = require('jsonwebtoken');
const CError = require('../../errors/customeError');
const { StatusCodes } = require('http-status-codes')

module.exports.generateToken = async (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });  
}

module.exports.getToken = async (req) => {
    try {
        return req.header('Authorization').split(' ')[1];
    } catch(err) {
        return null;
    }
}

module.exports.verifyToken = async (token) => {
    if (token == null) throw new CError('token is not provided', StatusCodes.BAD_REQUEST);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        throw new CError(err.message, StatusCodes.UNAUTHORIZED);
    }
}