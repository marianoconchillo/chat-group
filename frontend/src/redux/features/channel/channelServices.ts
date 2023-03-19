import { createAsyncThunk } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import api, { ENDPOINT } from "../../../api/api";
import { Channel, ChannelDetails } from "../../../interfaces/Channel";
import { RootState } from "../../store";

interface RequestBody {
    name: string;
    description: string;
}

interface AuthConfig {
    headers: {
        Authorization: string;
    };
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

            socket.emit("joinChannel", data.name);

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

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
