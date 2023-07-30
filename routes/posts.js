const { Router, json } = require('express');

const { getPosts, createPost, updatePost, retrivePost, deletePost } = require('../controllers/posts');
const { standardPost } = require('../validations/posts');
const { wrapIt } = require('../errors/errorWrapper');
const { validateObjectId } = require('../validations/general');
const { isCreatorOrReadOnly } = require('../permissions/main');
const Post = require('../models/posts');
const { validateMiddleware } = require('../validations/middlewares')

const router = Router();

router.route('/')
    .get(wrapIt(getPosts))
    .post(standardPost, wrapIt(createPost));


router.route('/:id')
    .all(validateObjectId(Post), validateMiddleware, isCreatorOrReadOnly(Post))

    .get(wrapIt(retrivePost))
    .put(standardPost, wrapIt(updatePost))
    .delete(wrapIt(deletePost));


module.exports = router;