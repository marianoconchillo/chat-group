"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = __importDefault(require("../socket/socket"));
// To get io object as a global variable in controllers
const ioMiddleware = (req, res, next) => {
    res.locals.io = socket_1.default;
    next();
};
exports.default = ioMiddleware;
//# sourceMappingURL=socketMiddleware.js.map