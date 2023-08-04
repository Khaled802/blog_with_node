const { Router } = require('express');

const { register, login } = require('../controllers/auth');
const { standardUser, loginUser } = require('../validations/auth');
const { validateMiddleware } = require('../validations/middlewares')


const router = new Router();

router.post('/register', standardUser, validateMiddleware, register);

router.post('/login', loginUser, validateMiddleware, login);

module.exports = router;