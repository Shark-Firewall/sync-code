const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const PORT = 4500;

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);
});

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
