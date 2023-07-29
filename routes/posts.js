const { Router, json } = require('express');

const { getPosts, createPost, updatePost, retrivePost, deletePost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts');
const { wrapIt } = require('../errors/errorWrapper');

const router = Router();

router.route('/')
    .get(wrapIt(getPosts))
    .post(standardPost, wrapIt(createPost));


router.route('/:postId')
    .get(wrapIt(retrivePost))
    .put(standardPost, wrapIt(updatePost))
    .delete(wrapIt(deletePost));


module.exports = router;