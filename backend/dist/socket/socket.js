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
        console.log("New WS Connection...");
        socket.on("joinChannel", (channel) => {
            socket.join(channel);
        });
        socket.on("chatMessage", (channel, user, text) => {
            const message = {
                user,
                message: text,
            };
            io.to(channel).emit("message", message);
        });
    });
};
exports.default = socketConnection;
//# sourceMappingURL=socket.js.map