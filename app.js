
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const dotenv = require('dotenv');



dotenv.config();


const app = express();
app.use(express.json());


const authRouter = require('../PBL authentication/routes/auth');
const chatRouter = require('./routes/chat');


const notFoundMiddleware = require('../PBL authentication/middleware/not-found');
const errorHandlerMiddleware = require('../PBL authentication/middleware/error-handler');


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chat', chatRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const server = http.createServer(app);


const wss = new WebSocket.Server({ server });


const Message = require('./model/message');

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received:', message);

    // Parse the incoming JSON message
    try {
      const data = JSON.parse(message);
      console.log('Parsed JSON:', data);

      // Extract sender, receiver, and text from the message
      const { sender, receiver, text } = data;

      // Create a new message document and save it to the database
      const newMessage = new Message({
        sender,
        receiver,
        text
      });

      newMessage.save()
        .then(() => {
          console.log('Message saved to database');
        })
        .catch(error => {
          console.error('Error saving message to database:', error);
        });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


// function savemessages(messagedata){
//   const message = new messagemodel(messagedata);
//   return message.save();
// }

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database...');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
const host = '192.168.6.33'; 
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;

    server.listen(port, host, () => {
      console.log(`Server is listening on http://${host}:${port}`); 
    });

  } catch (error) {
    console.error('Server start error:', error);
  }
};


start();
