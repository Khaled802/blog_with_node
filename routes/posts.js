const { Router, json } = require('express');

const { getPosts, createPost, updatePost, retrivePost, deletePost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts');
const { validateObjectId } = require('../validations/general');
const { isCreatorOrReadOnly } = require('../permissions/main');
const Post = require('../models/posts');
const { validateMiddleware } = require('../validations/middlewares');
const {wrapIt} = require('../errors/errorWrapper')

const router = Router();

router.route('/')
    .get(getPosts)
    .post(standardPost, validateMiddleware, createPost);


router.route('/:id')
    .all(validateObjectId(Post), validateMiddleware, isCreatorOrReadOnly(Post))

    .get(retrivePost)
    .put(standardPost, validateMiddleware, updatePost)
    .delete(deletePost);


module.exports = router;