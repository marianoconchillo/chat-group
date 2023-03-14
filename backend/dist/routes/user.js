"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.route("/").post(users_1.registerUser);
router.route("/login").post(users_1.loginUser);
router.route("/loginFirebase").post(users_1.loginUserFirebase);
router.route("/me").get(authMiddleware_1.default, users_1.getMe);
router.route("/:id").patch(authMiddleware_1.default, users_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.js.map