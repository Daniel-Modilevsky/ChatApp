const express = require("express");
const helmet = require("helmet");
const socketio = require("socket.io");
const http = require("http");
const logger = require("./lib/logger");

const { addUser, removeUser, getUser, getUsersOfRoom } = require("./users");

const PORT = process.env.PORT || 8000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const cors = require("cors");

io.on("connection", (socket) => {
  connection(socket);
  SendingMassage(socket);
  disconnection(socket);
});

const connection = (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    logger.http(`${name} joined to room ${room}`);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    emitAsdmin(socket, user);
    //message to all the users of that room except the newly joined user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersOfRoom(user.room),
    });

    callback();
  });
};

const disconnection = (socket) => {
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
};

const SendingMassage = (socket) => {
  //user generated message are called 'sendMessage'
  socket.on("sendMessage", (message, callback) => {
    logger.info(message);
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersOfRoom(user.room),
    });

    callback();
  });
};

const emitAsdmin = (socket, user) => {
  //admin generated messages are called 'message'
  //welcome message for user
  socket.emit("message", {
    user: "admin",
    text: `${user.name}, welcome to the room ${user.room}`,
  });
};

app.use(router);
app.use(cors());
app.use(helmet);

server.listen(PORT, () => {
  logger.info(`Server Started on PORT ${PORT}`);
});
