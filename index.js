const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", ({ from, text}) => {
    io.emit("chat message", {from, text});
  });
  socket.on("disconnect", () => console.log("user disconnected"));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


server.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
