const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

require('dotenv').config();

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api', postsRouter);


app.use((err, req, res, next) => {
    const result = { error: err.getMessage() };
    if (err.getMsgList())
        result.msgList = err.getMsgList()

    return res.status(err.getStatusCode()).json(result);
});

const startServer = async()=> {
    const mongoUrl = await process.env.MONGO_URL;
    try {
        const conn = await mongoose.connect(mongoUrl);
        app.listen(PORT, console.log(`server started at http://localhost:${PORT}`));
    } catch(err) {
        console.log(err);
    }

}


startServer();