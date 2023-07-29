const { Router } = require('express');

const { register, login } = require('../controllers/auth');
const { standardUser, loginUser } = require('../validations/auth');
const { wrapIt } = require('../errors/errorWrapper');

const router = new Router();

router.post('/register', standardUser, wrapIt(register));

router.post('/login', loginUser, wrapIt(login));

module.exports = router;