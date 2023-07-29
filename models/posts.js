const { Schema, model } = require('mongoose');


const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    creatorId: {
        type: Object,
        ref: 'User'
    }
}, { timestamps: true });

const Post = model('Post', PostSchema);

module.exports = Post;
