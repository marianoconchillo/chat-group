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
exports.newMessage = exports.getDefaultChannel = exports.getChannelById = exports.getAllChannels = exports.newChannel = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const channel_1 = __importDefault(require("../models/channel"));
const message_1 = __importDefault(require("../models/message"));
exports.newChannel = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const channelExists = yield channel_1.default.findOne({ name });
    if (channelExists) {
        res.status(400);
        throw new Error("Channel already exists");
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
        res.status(400);
        throw new Error("Invalid channel data");
    }
}));
exports.getAllChannels = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channels = yield channel_1.default.find();
    res.status(200).json(channels);
}));
exports.getChannelById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield channel_1.default.findById(req.params.id)
        .populate("users")
        .populate("messages")
        .exec();
    if (channel) {
        res.status(200).json(channel);
    }
    else {
        res.status(400);
        throw new Error("Channel not found");
    }
}));
exports.getDefaultChannel = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DEFAULT_CHANNEL = "WELCOME";
    const defaultChannel = yield channel_1.default.findOne({ name: DEFAULT_CHANNEL })
        .populate("users")
        .populate("messages")
        .exec();
    if (defaultChannel) {
        res.status(200).json(defaultChannel);
    }
    else {
        res.status(400);
        throw new Error("Channel not found");
    }
}));
exports.newMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userId, text } = req.body;
    if (!name || !userId || !text) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const channel = yield channel_1.default.findOne({ name });
    if (!channel) {
        res.status(400);
        throw new Error("Channel not found");
    }
    const message = yield message_1.default.create({
        user: userId,
        text,
    });
    if (message) {
        channel.messages.push(message);
        yield channel.save();
    }
    else {
        res.status(400);
        throw new Error("Could not send message");
    }
}));
//# sourceMappingURL=channel.js.map