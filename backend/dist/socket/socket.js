"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const moment_1 = __importDefault(require("moment"));
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
                time: (0, moment_1.default)().format("h:mm a"),
            };
            io.to(channel).emit("message", message);
        });
    });
};
exports.default = socketConnection;
//# sourceMappingURL=socket.js.map