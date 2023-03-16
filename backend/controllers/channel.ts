import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import Channel, { IChannel } from "../models/channel";

export const newChannel = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user?._id;
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({
                msg: "Please add all fields",
            });
        }

        const channelExists = await Channel.findOne({ name });

        if (channelExists) {
            res.status(400).json({
                msg: "Channel already exists",
            });
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
            res.status(400).json({
                msg: "Invalid channel data",
            });
        }
    }
);

export const getAllChannels = asyncHandler(
    async (req: Request, res: Response) => {
        const channels = await Channel.find();
        res.status(200).json(channels);
    }
);
