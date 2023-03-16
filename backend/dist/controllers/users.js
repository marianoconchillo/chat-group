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
exports.updateUser = exports.getMe = exports.loginUserFirebase = exports.loginUser = exports.registerUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const user_1 = __importDefault(require("../models/user"));
const cloudinary_1 = require("../utils/cloudinary");
// @desc    Register new user
// @route   POST /api/users
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            msg: "Please add all fields",
        });
    }
    // Check if user exists
    const userExists = yield user_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({
            msg: "User already exists",
        });
    }
    const hashedPassword = yield hashPassword(password);
    const user = yield user_1.default.create({
        email: email || "",
        password: hashedPassword,
        name: "",
        bio: "",
        phone: "",
        pictureUrl: "",
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({
            msg: "Invalid user data",
        });
    }
}));
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            msg: "Please add all fields",
        });
    }
    const user = yield user_1.default.findOne({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        res.json({
            _id: user._id,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({
            msg: "Invalid credentials",
        });
    }
}));
// @desc    Authenticate a user with firebase service
// @route   POST /api/users/loginFirebase
// @access  Public
exports.loginUserFirebase = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, displayName, phoneNumber, uid } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (user) {
        res.json({
            _id: user._id,
            token: generateToken(user._id),
        });
    }
    else {
        const hashedPassword = yield hashPassword(uid);
        const newUser = yield user_1.default.create({
            email: email,
            name: displayName,
            phone: phoneNumber,
            pictureUrl: "",
            bio: "",
            password: hashedPassword,
        });
        if (newUser) {
            res.json({
                _id: newUser._id,
                token: generateToken(newUser._id),
            });
        }
        else {
            res.status(400).json({
                msg: "Login error with Firebase",
            });
        }
    }
}));
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
exports.getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const { email, password, name, bio, phone, pictureUrl } = req.user;
        res.status(200).json({
            email: email || "",
            password: password || "",
            name: name || "",
            bio: bio || "",
            phone: phone || "",
            pictureUrl: pictureUrl || "",
        });
    }
    else {
        res.status(400).json({
            msg: "Invalid user data",
        });
    }
}));
// @desc    Update user data
// @route   PATCH /api/users/:id
// @access  Private
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, phone, password } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ msg: "Invalid user ID" });
    }
    let user = yield user_1.default.findById(id);
    if (user) {
        // Image
        if (req.files) {
            try {
                const file = Array.isArray(req.files.file)
                    ? req.files.file[0]
                    : req.files.file;
                const result = yield (0, cloudinary_1.uploadImage)(file.tempFilePath);
                yield fs_extra_1.default.unlink(file.tempFilePath);
                user.pictureUrl = result.secure_url;
            }
            catch (error) {
                res.status(400).json({
                    msg: "Error uploading the image",
                });
            }
        }
        if (password !== "")
            user.password = yield hashPassword(password);
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.phone = phone || user.phone;
        user.pictureUrl = user.pictureUrl;
        const updatedUser = yield user.save();
        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            bio: updatedUser.bio,
            phone: updatedUser.phone,
            pictureUrl: updatedUser.pictureUrl,
            token: generateToken(updatedUser._id),
        });
    }
    else {
        res.status(404).json({
            msg: "User not found",
        });
    }
}));
// Hash Password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const salt = yield bcrypt_1.default.genSalt(saltRounds);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    return hashedPassword;
});
// Generate JWT
const generateToken = (id) => {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    }
    else {
        throw new Error("JWT secret is not defined");
    }
};
//# sourceMappingURL=users.js.map