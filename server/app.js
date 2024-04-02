const express = require("express");
const http = require("http");

const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", (msg) => {
    console.log("Message received: ", msg);
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
