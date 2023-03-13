"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const message_1 = require("./message");
const channelSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    messages: [message_1.messageSchema],
}, {
    timestamps: true,
});
const Channel = (0, mongoose_1.model)("Channel", channelSchema);
exports.default = Channel;
//# sourceMappingURL=channel.js.map