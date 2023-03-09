import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

const server = new Server();
server.listen();

const app = server.getApp();

module.exports = app;
