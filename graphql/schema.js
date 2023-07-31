const { buildSchema } = require('graphql');


module.exports = buildSchema(`
    
    type RootQuery {
        post(id: String!): Post
        posts: [Post]
    }

    input PostInput {
        title: String!,
        content: String!,
        imageUrl: String!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post!,
        updatePost(postId: String!, postInput: PostInput): Post!,
        deletePost(postId: String!): String
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }

    type Post {
        _id: String!,
        title: String!,
        content: String!,
        imageUrl: String!,
        creatorId: String,
        createdAt: String
    }
`)