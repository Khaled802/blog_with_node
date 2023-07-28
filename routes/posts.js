const { Router, json } = require('express');

const { getPosts, createPost, updatePost, retrivePost, deletePost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts')

const router = Router();

router.route('/posts')
    .get(getPosts)
    .post(standardPost, createPost)


router.route('/posts/:postId')
    .get(retrivePost)
    .put(standardPost, updatePost)
    .delete(deletePost)


module.exports = router;