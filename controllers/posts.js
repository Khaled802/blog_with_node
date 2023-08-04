const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Post = require('../models/posts');
const CError = require('../errors/customeError');
const { validate } = require('./helpers/general');
const { isCreatorOrReadOnly } = require('../permissions/main');
const { getCurrentUserOrError, getUserOrError } = require('./helpers/user');


module.exports.getPosts = async(req, res, next)=> {
    const posts  = await Post.find();
    return res.status(StatusCodes.OK).json(posts);
}


module.exports.createPost = async(req, res, next) => {
    const { title, content,imageUrl } = req.body;
    
    const creator = await getCurrentUserOrError(req);

    const post = await Post.create({
        title,
        content,
        imageUrl,
        creatorId: creator._id
    });

    creator.posts.push(post._id);
    await creator.save();

    return res.status(StatusCodes.OK).json(post);
};


module.exports.retrivePost = async(req, res, next) => {
    const postId = req.params.id;
    const post =  await getPostOrThrowError(postId);

    return res.status(StatusCodes.OK).json(post);
};


module.exports.updatePost = async(req, res, next) => {
    const { title, content, imageUrl } = req.body;
    
    const postId = req.params.id;
    const post = await getPostOrThrowError(postId);

    post.title = title;
    post.content = content;
    post.imageUrl =  imageUrl;

    await post.save();

    return res.status(StatusCodes.OK).json(post);
}

module.exports.deletePost = async(req, res, next) => {
    const postId = req.params.id;
    const post = await getPostOrThrowError(postId);

    const creator = await getUserOrError(post.creatorId);
    
    await post.deleteOne();
    creator.posts.pull(post._id);
    await creator.save();
    return res.status(StatusCodes.NO_CONTENT).json({ message: "delete successfully"});
};



const getPostOrThrowError = async (postId) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new CError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return post;
}