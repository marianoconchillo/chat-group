import { createAsyncThunk } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import api, { ENDPOINT } from "../../../api/api";
import { AuthConfig } from "../../../interfaces/AuthConfig";
import { Channel, ChannelDetails, Message } from "../../../interfaces/Channel";
import { RootState } from "../../store";
import { addNewMessage } from "./channelSlice";

interface RequestBody {
    name: string;
    description: string;
}

interface NewMessage {
    userId: string;
    text: string;
    channelId: string;
}

export interface SocketMessage {
    idChannel: string;
    _id: string;
    text: string;
    user: {
        _id: string;
        name: string;
        pictureUrl: string;
    };
    createdAt: string;
}

const socket: Socket = io(ENDPOINT);

export const newChannel = createAsyncThunk(
    "channel/new",
    async (requestBody: RequestBody, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.post<Channel>(
                `/channels`,
                requestBody,
                config
            );

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const getAllChannels = createAsyncThunk(
    "channel/getAll",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.get<Channel[]>(`/channels`, config);

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const getDefaultChannel = createAsyncThunk(
    "channel/getDefaultChannel",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.get<ChannelDetails>(
                `/channels/default`,
                config
            );

            if (state.channel.selectedChannel) {
                socket.emit("leave-room", state.channel.selectedChannel._id);
            }

            socket.emit("joinChannel", data._id);

            // Message from server
            socket.on("message", (message) => {
                thunkAPI.dispatch(addNewMessage(message));
            });

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const getChannelDetails = createAsyncThunk(
    "channel/getDetails",
    async (idChannel: string, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.get<ChannelDetails>(
                `/channels/${idChannel}`,
                config
            );

            if (state.channel.selectedChannel) {
                socket.emit("leave-room", state.channel.selectedChannel._id);
            }

            socket.emit("joinChannel", data._id);

            // Message from server
            // socket.on("message", (message) => {
            //     thunkAPI.dispatch(addNewMessage(message));
            // });

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const newMessage = createAsyncThunk(
    "channel/newMessage",
    async (message: NewMessage, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.post<Message>(
                `/channels/${message.channelId}/messages`,
                message,
                config
            );

            const { _id, text, user, createdAt } = data;

            const socketMessage: SocketMessage = {
                idChannel: message.channelId,
                _id,
                text,
                user: {
                    _id: user._id,
                    name: user.name,
                    pictureUrl: user.pictureUrl,
                },
                createdAt: createdAt,
            };

            socket.emit("chatMessage", socketMessage);

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
