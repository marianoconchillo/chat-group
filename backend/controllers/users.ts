import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UploadApiResponse } from "cloudinary";
import fs from "fs-extra";
import User, { IUser } from "../models/user";
import { uploadImage } from "../utils/cloudinary";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                msg: "Please add all fields",
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({
                msg: "User already exists",
            });
        }

        const hashedPassword: string = await hashPassword(password);

        const user: IUser = await User.create({
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
        } else {
            res.status(400).json({
                msg: "Invalid user data",
            });
        }
    }
);

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            msg: "Please add all fields",
        });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            bio: user.bio,
            phone: user.phone,
            pictureUrl: user.pictureUrl,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            msg: "Invalid credentials",
        });
    }
});

// @desc    Authenticate a user with firebase service
// @route   POST /api/users/loginFirebase
// @access  Public
export const loginUserFirebase = asyncHandler(
    async (req: Request, res: Response) => {
        const { email, displayName, phoneNumber, uid } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            res.json({
                _id: user._id,
                email: user.email,
                name: user.name,
                bio: user.bio,
                phone: user.phone,
                pictureUrl: user.pictureUrl,
                token: generateToken(user._id),
            });
        } else {
            const hashedPassword: string = await hashPassword(uid);

            const newUser: IUser = await User.create({
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
                    email: newUser.email,
                    name: newUser.name,
                    bio: newUser.bio,
                    phone: newUser.phone,
                    pictureUrl: newUser.pictureUrl,
                    token: generateToken(newUser._id),
                });
            } else {
                res.status(400).json({
                    msg: "Login error with Firebase",
                });
            }
        }
    }
);

// @desc    Update user data
// @route   PATCH /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, phone, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ msg: "Invalid user ID" });
    }

    let user: IUser | null = await User.findById(id);

    if (user) {
        // Image
        if (req.files) {
            try {
                const file = Array.isArray(req.files.file)
                    ? req.files.file[0]
                    : req.files.file;

                const result: UploadApiResponse = await uploadImage(
                    file.tempFilePath
                );

                await fs.unlink(file.tempFilePath);

                user.pictureUrl = result.secure_url;
            } catch (error) {
                res.status(400).json({
                    msg: "Error uploading the image",
                });
            }
        }

        if (password !== "") user.password = await hashPassword(password);

        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.phone = phone || user.phone;
        user.pictureUrl = user.pictureUrl;

        const updatedUser: IUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            bio: updatedUser.bio,
            phone: updatedUser.phone,
            pictureUrl: updatedUser.pictureUrl,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({
            msg: "User not found",
        });
    }
});

// Hash Password
const hashPassword = async (password: string): Promise<string> => {
    const saltRounds: number = 10;
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// Generate JWT
const generateToken = (id: ObjectId) => {
    if (process.env.JWT_SECRET) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
    } else {
        throw new Error("JWT secret is not defined");
    }
};
