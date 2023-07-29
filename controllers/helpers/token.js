const jwt = require('jsonwebtoken');

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
    if (token == null) return 'token not provided'
    return jwt.verify(token, process.env.JWT_SECRET);
}