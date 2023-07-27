const Post = require('../models/posts');
const { validationResult } = require('express-validator')

module.exports.getPosts = async(req, res, next)=> {
    let posts = [];
    try {
        posts = await Post.find();
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json(posts);
}


module.exports.createPost = async(req, res, next) => {
    const valid_messages = validationResult(req);

    if (!valid_messages.isEmpty()) {
        return res.status(422).json({ message: valid_messages.array() });
    }

    const { title, content,imageUrl } = req.body;
    let post = null;
    try {
        post = await Post.create({
            title,
            content,
            imageUrl
        });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    return res.json(post);
}