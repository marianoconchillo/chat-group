"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_1 = require("../controllers/channel");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.route("/").post(authMiddleware_1.default, channel_1.newChannel);
router.route("/").get(authMiddleware_1.default, channel_1.getAllChannels);
router.route("/default").get(authMiddleware_1.default, channel_1.getDefaultChannel);
router.route("/:id").get(authMiddleware_1.default, channel_1.getChannelById);
router.route("/:id/messages").post(authMiddleware_1.default, channel_1.newMessage);
exports.default = router;
//# sourceMappingURL=channel.js.map