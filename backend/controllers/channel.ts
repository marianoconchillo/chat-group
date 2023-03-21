import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import Channel, { IChannel } from "../models/channel";
import Message, { IMessage } from "../models/message";
import { IUser } from "../models/user";

// @desc    Create new Channel
// @route   POST /api/channels
// @access  Private
export const newChannel = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user?._id;
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400);
            throw new Error("Please add all fields");
        }

        const channelExists = await Channel.findOne({ name });

        if (channelExists) {
            res.status(400);
            throw new Error("Channel already exists");
        }

        const channel: IChannel = await Channel.create({
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
        } else {
            res.status(400);
            throw new Error("Invalid channel data");
        }
    }
);

// @desc    Get all Channels
// @route   GET /api/channels
// @access  Private
export const getAllChannels = asyncHandler(
    async (req: Request, res: Response) => {
        const channels = await Channel.find();
        res.status(200).json(channels);
    }
);

// @desc    Get Channel by ID
// @route   GET /api/channels/:id
// @access  Private
export const getChannelById = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user?.id;

        let channel = await Channel.findById(req.params.id)
            .populate<{ users: IUser[] }>("users")
            .populate({
                path: "messages",
                populate: {
                    path: "user",
                },
            })
            .exec();

        if (channel) {
            const alreadyMember = channel.users.find(
                (user) => user._id.toString() === userId
            );

            if (!alreadyMember) {
                channel.users.push(userId);
                await channel.save();
                channel = await channel.populate("users");
            }

            res.status(200).json(channel);
        } else {
            res.status(400);
            throw new Error("Channel not found");
        }
    }
);

// @desc    Get default Channel
// @route   GET /api/channels/default
// @access  Private
export const getDefaultChannel = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        const DEFAULT_CHANNEL = "WELCOME";
        const userId = req.user?.id;

        let defaultChannel = await Channel.findOne({ name: DEFAULT_CHANNEL })
            .populate<{ users: IUser[] }>("users")
            .populate({
                path: "messages",
                populate: {
                    path: "user",
                },
            })
            .exec();

        if (defaultChannel) {
            const alreadyMember = defaultChannel.users.find(
                (user) => user._id.toString() === userId
            );

            if (!alreadyMember) {
                defaultChannel.users.push(userId);
                await defaultChannel.save();
                defaultChannel = await defaultChannel.populate("users");
            }

            res.status(200).json(defaultChannel);
        } else {
            res.status(400);
            throw new Error("Channel not found");
        }
    }
);

// @desc    Create new Message
// @route   POST /api/channels/:id/messages
// @access  Private
export const newMessage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, text } = req.body;

    if (!userId || !text) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const channel = await Channel.findById(id);

    if (!channel) {
        res.status(400);
        throw new Error("Channel not found");
    }

    const message: IMessage = await Message.create({
        user: userId,
        text,
    });

    if (message) {
        channel.messages.push(message);
        await channel.save();

        const messageSaved = await Message.findById(message._id).populate(
            "user"
        );

        res.status(201).json(messageSaved);
    } else {
        res.status(400);
        throw new Error("Could not send message");
    }
});
