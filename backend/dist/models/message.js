"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
const Message = (0, mongoose_1.model)("Message", exports.messageSchema);
exports.default = Message;
//# sourceMappingURL=message.js.map