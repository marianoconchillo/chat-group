import { Schema, model, Document, ObjectId } from "mongoose";
import { IMessage, messageSchema } from "./message";

export interface IChannel extends Document {
    _id: ObjectId;
    name: string;
    description: string;
    users: ObjectId[];
    messages: IMessage[];
}

const channelSchema = new Schema<IChannel>(
    {
        name: { type: String, required: true, unique: true, uppercase: true },
        description: { type: String, required: true },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
);

const Channel = model<IChannel>("Channel", channelSchema);

export default Channel;
