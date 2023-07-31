const Post = require('../models/posts');
const CError = require('../errors/customeError');
const { getCurrentUserOrError } = require('../controllers/helpers/user');
const { isCreatorORthrowError } = require('./helpers/authorizations');
const { StatusCodes } = require('http-status-codes');

const getPost = async function (args) {
    const id = args.id
  

    const post = await Post.findById(id)

    if (post == null) {
        throw new CError('not found', 404)
    }

    return { ...post._doc, _id:post._id.toString()}
}

const getAllPosts = async () => {
    return Post.find();
}


const createPost = async ({ postInput }, req) => {
    const { title, content, imageUrl } = postInput;
    const creator = await getCurrentUserOrError(req);
    const creatorId = creator._id.toString();
    
    const post = await Post.create({
        title, 
        content,
        imageUrl,
        creatorId
    });

    return { ...post._doc, creatorId }
}

const updatePost = async({ postId, postInput }, req) => {
    const user = req.user;
    const post = await Post.findById(postId);
    if (post == null) throw new CError('not found post', StatusCodes.NOT_FOUND);
    isCreatorORthrowError(post, user);
    post.title = postInput.title;
    post.content = postInput.content;
    post.imageUrl = postInput.imageUrl;

    await post.save();
    return post;
}


const deletePost = async({ postId }, req) => {
    const user = req.user;
    const post = await Post.findById(postId);
    if (post == null) throw new CError('not found post', StatusCodes.NOT_FOUND);
    isCreatorORthrowError(post, user);
    await post.deleteOne();
}
const root = {
    post: getPost,
    posts: getAllPosts,
    createPost,
    updatePost,
    deletePost
}

module.exports = root;