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
    messages: any[];
    createdAt: string;
    updatedAt: string;
}
