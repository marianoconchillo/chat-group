"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./db/config"));
const user_1 = __importDefault(require("./routes/user"));
class Server {
    constructor() {
        this.apiPaths = {
            users: "/api/users",
        };
        this.dbConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "5000";
        this.middlewares();
        this.dbConnection();
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.users, user_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        const tempDir = path_1.default.join(__dirname, "/uploads");
        if (!fs_1.default.existsSync(tempDir)) {
            fs_1.default.mkdtempSync(tempDir);
        }
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: tempDir,
        }));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map