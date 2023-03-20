import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

interface Message {
    user: string;
    message: string;
}

const socketConnection = (server: HttpServer) => {
    const io: SocketIOServer = new SocketIOServer(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("New WS Connection...");

        socket.on("joinChannel", (channel: string) => {
            socket.join(channel);
        });

        socket.on(
            "chatMessage",
            (channel: string, user: string, text: string) => {
                const message: Message = {
                    user,
                    message: text,
                };
                io.to(channel).emit("message", message);
            }
        );
    });
};

export default socketConnection;
