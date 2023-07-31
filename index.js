const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const { graphqlHTTP } = require("express-graphql");

require('dotenv').config();

const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const CError = require('./errors/customeError');
const { StatusCodes } = require('http-status-codes');
const { isAuth } = require('./permissions/main');
const { wrapIt } = require('./errors/errorWrapper');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/posts', isAuth, postsRouter);
app.use('/api/auth', authRouter);
app.use('/graphql', isAuth, graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
}));

app.use((err, req, res, next) => {
    if (!(err instanceof CError)){
        return res.status(500).json(err.message); 
    }
    const result = { error: err.getMessage() };
    console.log(err);
    if (err.getMsgList())
        result.msgList = err.getMsgList()

    return res.status(err.getStatusCode()).json(result);
});

const startServer = async()=> {
    const mongoUrl = process.env.MONGO_URL;
    try {
        const conn = await mongoose.connect(mongoUrl);
        app.listen(PORT, console.log(`server started at http://localhost:${PORT}`));
    } catch(err) {
        console.log(err);
    }

}


startServer();