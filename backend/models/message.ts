import { Schema, model, Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
    _id: ObjectId;
    text: string;
    user: ObjectId;
}

export const messageSchema = new Schema<IMessage>(
    {
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
);

const Message = model<IMessage>("Channel", messageSchema);

export default Message;
