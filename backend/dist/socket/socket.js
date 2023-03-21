"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketConnection = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        socket.on("joinChannel", (channel) => {
            socket.join(channel);
        });
        socket.on("chatMessage", (message) => {
            socket.broadcast.to(message.idChannel).emit("message", message);
        });
        socket.on("leave-room", (channel) => {
            socket.leave(channel);
        });
    });
};
exports.default = socketConnection;
//# sourceMappingURL=socket.js.map