import { User } from "./User";

export interface Channel {
    _id: string;
    name: string;
    description: string;
}

export interface ChannelDetails {
    _id: string;
    name: string;
    description: string;
    users: User[];
    messages: Message[];
    createdAt: string;
}

export interface Message {
    _id: string;
    text: string;
    user: User;
    createdAt: string;
}
