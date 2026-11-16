const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3001 });
const users = new Set();

server.on("connection", (socket) => {
    console.log("Client connected!");
    users.add(socket);

    socket.on("message", (message) => {
        console.log("Received:", message.toString());
        users.forEach((user) => {
            user.send(message.toString());
        });
        // socket.send(message.toString());
    });

    socket.on("close", () => {
        console.log("Client disconnected!");
    });
});
