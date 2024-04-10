
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

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


const io = require('socket.io')(server)
  

const Message = require('./model/message');

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on("message", async (msg) => {
    console.log(msg);
    try {
      const message = new Message(msg);
      await message.save();

      console.log("message saved in mongo:".message);
      let targetId = msg.targetId;
      if (clients[targetId]) clients[targetId].emit("message", msg);
      
    } catch (error) {
      console.log("error occured while sending message",error);
    }
    
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
//const host = '192.168.6.33'; 
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;

    server.listen(port,"0.0.0.0", () => {
      console.log(`Server is listening on http://${port}`); 
    });

  } catch (error) {
    console.error('Server start error:', error);
  }
};


start();
