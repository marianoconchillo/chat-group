import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

interface Message {
    idChannel: string;
    _id: string;
    text: string;
    user: User;
    createdAt: string;
}

interface User {
    _id: string;
    name: string;
    pictureUrl: string;
}

const socketConnection = (server: HttpServer) => {
    const io: SocketIOServer = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket: Socket) => {
        socket.on("joinChannel", (channel: string) => {
            socket.join(channel);
        });

        socket.on("chatMessage", (message: Message) => {
            socket.broadcast.to(message.idChannel).emit("message", message);
        });

        socket.on("leave-room", (channel: string) => {
            socket.leave(channel);
        });
    });
};

export default socketConnection;
