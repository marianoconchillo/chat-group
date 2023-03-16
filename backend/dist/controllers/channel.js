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
exports.getAllChannels = exports.newChannel = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const channel_1 = __importDefault(require("../models/channel"));
exports.newChannel = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400).json({
            msg: "Please add all fields",
        });
    }
    const channelExists = yield channel_1.default.findOne({ name });
    if (channelExists) {
        res.status(400).json({
            msg: "Channel already exists",
        });
    }
    const channel = yield channel_1.default.create({
        name,
        description,
        users: [id],
    });
    if (channel) {
        res.status(201).json({
            _id: channel._id,
            name: channel.name,
            description: channel.description,
        });
    }
    else {
        res.status(400).json({
            msg: "Invalid channel data",
        });
    }
}));
exports.getAllChannels = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = yield channel_1.default.find();
    res.status(200).json(channels);
}));
//# sourceMappingURL=channel.js.map