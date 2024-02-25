const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

require('dotenv').config();

const app =express();

app.use(express.json());
const connectDB = require('./db/connect');

const authrouter = require('../PBL authentication/routes/auth');
const chatrouter = require('./routes/chat');

const notfoundmiddleware = require('../PBL authentication/middleware/not-found');
const errorhandlermiddleware = require('../PBL authentication/middleware/error-handler');


//api routes
app.use('/api/v1/auth',authrouter);
app.use('/api/v1/chat',chatrouter);

//middlewares
app.use(notfoundmiddleware);
app.use(errorhandlermiddleware);

//creating server
const server = http.createServer(app);
const io = socketio(server);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle socket events here (e.g., send/receive messages)
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = process.env.PORT || 5000;
//const host = '192.168.55.33';
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI); 
        console.log('the database connected...')
        app.listen(port,()=>
            console.log(`server is listening on port ${port}`)
        )
    } catch (error) {
        console.log(error);
    }
}

start();