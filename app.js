const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');
const teamRouter = require('./routes/team');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/team',teamRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);

const io = require('socket.io')(server);
const clients = {}; // Initialize the clients object

const Message = require('./model/message');

io.on("connection", (socket) => {
  console.log("connected");
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

      console.log("message saved in mongo:", message); // Corrected log statement
      let targetId = msg.targetId;
      if (clients[targetId]) {
        clients[targetId].emit("message", msg);
      }

    } catch (error) {
      console.log("error occurred while sending message", error);
    }
  });

  socket.on("disconnect", () => { // Handle socket disconnection
    console.log(socket.id, "disconnected");
    // Remove the socket from clients
    Object.keys(clients).forEach(clientId => {
      if (clients[clientId] === socket) {
        delete clients[clientId];
      }
    });
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the database...');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

//const host = '192.168.0.121'; // Ensure this is correctly set for your network
const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;

    server.listen(port, () => {
      console.log(`Server is listening on http://${port}`); // Corrected log statement
    });

  } catch (error) {
    console.error('Server start error:', error);
  }
};

start();

