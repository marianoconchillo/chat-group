import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";
import { Channel } from "../../../interfaces/Channel";
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
