const express = require('express');
require('dotenv').config();

const app =express();

const connectDB = require('./db/connect');

const authrouter = require('../PBL authentication/routes/auth');

const notfoundmiddleware = require('../PBL authentication/middleware/not-found');
const errorhandlermiddleware = require('../PBL authentication/middleware/error-handler');

app.use(express.json());

app.use('/api/v1/auth',authrouter);

app.use(notfoundmiddleware);
app.use(errorhandlermiddleware);

port = process.env.PORT || 3000 ;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>
            console.log(`server is listening on port ${port}`)
        )
    } catch (error) {
        console.log(error);
    }
}

start();