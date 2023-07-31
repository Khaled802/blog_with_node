const { Router } = require('express');

const { register, login } = require('../controllers/auth');
const { standardUser, loginUser } = require('../validations/auth');

const router = new Router();

router.post('/register', standardUser, register);

router.post('/login', loginUser, login);

module.exports = router;