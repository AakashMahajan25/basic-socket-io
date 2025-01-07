const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server} = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A User connected: ", socket.id);
    socket.on("message", (message) => {
        console.log("Message: ", message);
        io.emit("message", message);
    })
})


server.listen(8000, () => {
    console.log("Server is running on port 8000");
})
