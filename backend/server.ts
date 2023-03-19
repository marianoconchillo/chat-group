import express, { Application } from "express";
import fileUpload from "express-fileupload";
import { Server as HttpServer, createServer } from "http";
import path from "path";
import fs from "fs";
import cors from "cors";
import connectDB from "./db/config";
import userRoutes from "./routes/user";
import channelRoutes from "./routes/channel";
import errorHandler from "./middleware/errorMiddleware";
import socketConnection from "./socket/socket";

class Server {
    private app: Application;
    private server: HttpServer;
    private port: string;
    private apiPaths = {
        users: "/api/users",
        channels: "/api/channels",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "5000";
        this.server = createServer(this.app);

        this.middlewares();
        this.dbConnection();
        this.routes();

        this.socketConnection();
        this.app.use(errorHandler);
    }

    private routes() {
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.channels, channelRoutes);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());

        const tempDir = path.join(__dirname, "/uploads");

        if (!fs.existsSync(tempDir)) {
            fs.mkdtempSync(tempDir);
        }

        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: tempDir,
            })
        );
    }

    private dbConnection = async () => {
        await connectDB();
    };

    private socketConnection = () => {
        socketConnection(this.server);
    };

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }

    getApp(): Application {
        return this.app;
    }

    getServer(): HttpServer {
        return this.server;
    }
}

export default Server;
