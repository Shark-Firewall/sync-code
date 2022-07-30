const http = require("http");
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const path = require("path");
const PORT = 4500;

app.use(express.static("../frontend/build"));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  //map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("code_change", ({ roomId, code }) => {
    socket.in(roomId).emit("code_change", {
      code,
    });
  });

  socket.on("code_sync", ({ socketId, code }) => {
    io.to(socketId).emit("code_change", { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
