const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const Post = require('../models/posts');
const CError = require('../errors/customeError');
const { wrapIt } = require('../errors/errorWrapper');
const { validate } = require('./helpers/general');
const { isCreatorOrReadOnly } = require('../permissions/main');



module.exports.getPosts = async(req, res, next)=> {
    let posts = [];

    try {
        posts = await Post.find();
    } catch(err) {
        throw new CError(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
    return res.status(StatusCodes.OK).json(posts);
}


module.exports.createPost = async(req, res, next) => {
    validate(req, res)
    const { title, content,imageUrl } = req.body;
    
    const post = await wrapIt( 
    async() => {
        return await Post.create({
            title,
            content,
            imageUrl
        });
    });

    return res.status(StatusCodes.OK).json(post);
}


module.exports.retrivePost = async(req, res, next) => {
    validate(req, res);
    
    const postId = req.params.postId;
    const post =  await getPostOrThrowError(postId);
    await isCreatorOrReadOnly(req, res, next, post.creatorId);


    return res.status(StatusCodes.OK).json(post);
};


module.exports.updatePost = async(req, res, next) => {
    validate(req, res);

    const { title, content, imageUrl } = req.body;
    
    const postId = req.params.postId;
    const post = await getPostOrThrowError(postId);
    await isCreatorOrReadOnly(req, res, next, post.creatorId);

    post.title = title;
    post.content = content;
    post.imageUrl =  imageUrl;

    await post.save();

    return res.status(StatusCodes.OK).json(post);
}

module.exports.deletePost = async(req, res, next) => {
    validate(req, res);

    const postId = req.params.postId;
    const post = await getPostOrThrowError(postId);
    await isCreatorOrReadOnly(req, res, next, post.creatorId);


    await post.deleteOne();
    return res.status(StatusCodes.NO_CONTENT).json({ message: "delete successfully"});
};



const getPostOrThrowError = async (postId) => {
    return await wrapIt(async()=> {
        const post = await Post.findById(postId);
        console.log(post)
        if (!post) {
            throw new CError(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND);
        }
        return post;
    })
}