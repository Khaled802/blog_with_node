const { Router, json } = require('express');

const { getPosts, createPost, updatePost, retrivePost, deletePost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts');

const router = Router();

router.route('/')
    .get(getPosts)
    .post(standardPost, createPost)


router.route('/:postId')
    .get(retrivePost)
    .put(standardPost, updatePost)
    .delete(deletePost)


module.exports = router;