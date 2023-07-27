const { Router, json } = require('express');

const { getPosts, createPost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts')

const router = Router();

router.route('/posts')
    .get(getPosts)
    .post(standardPost, createPost)


module.exports = router;