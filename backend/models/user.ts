import { Schema, model, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    name?: string;
    bio?: string;
    phone?: string;
    pictureUrl?: string;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, trim: true },
        bio: { type: String, trim: true },
        phone: { type: String, trim: true },
        pictureUrl: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", userSchema);

export default User;
