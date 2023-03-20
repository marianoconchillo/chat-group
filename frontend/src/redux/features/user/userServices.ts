import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";
import { AuthConfig } from "../../../interfaces/AuthConfig";
import { User } from "../../../interfaces/User";
import { RootState } from "../../store";

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const token: string = state.auth.userAuth?.token || "";

        const config: AuthConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await api.get<User>("/users/me", config);
        localStorage.setItem("user", JSON.stringify(data));

        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (formData: FormData, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const token: string = state.auth.userAuth?.token || "";
            const userId: string = state.auth.userAuth?._id || "";

            const config: AuthConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await api.patch<User>(
                `/users/${userId}`,
                formData,
                config
            );

            localStorage.setItem("user", JSON.stringify(data));

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
