import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import Channel, { IChannel } from "../models/channel";
import Message, { IMessage } from "../models/message";

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

export const getAllChannels = asyncHandler(
    async (req: Request, res: Response) => {
        const channels = await Channel.find();
        res.status(200).json(channels);
    }
);

export const getChannelById = asyncHandler(
    async (req: Request, res: Response) => {
        const channel = await Channel.findById(req.params.id)
            .populate("users")
            .populate("messages")
            .exec();

        if (channel) {
            res.status(200).json(channel);
        } else {
            res.status(400);
            throw new Error("Channel not found");
        }
    }
);

export const getDefaultChannel = asyncHandler(
    async (req: Request, res: Response) => {
        const DEFAULT_CHANNEL = "WELCOME";

        const defaultChannel = await Channel.findOne({ name: DEFAULT_CHANNEL })
            .populate("users")
            .populate("messages")
            .exec();

        if (defaultChannel) {
            res.status(200).json(defaultChannel);
        } else {
            res.status(400);
            throw new Error("Channel not found");
        }
    }
);

export const newMessage = asyncHandler(async (req: Request, res: Response) => {
    const { name, userId, text } = req.body;

    if (!name || !userId || !text) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const channel = await Channel.findOne({ name });

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
    } else {
        res.status(400);
        throw new Error("Could not send message");
    }
});
