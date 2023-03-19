import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import moment from "moment";

interface Message {
    user: string;
    message: string;
    time: string;
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
                    time: moment().format("h:mm a"),
                };
                io.to(channel).emit("message", message);
            }
        );
    });
};

export default socketConnection;
