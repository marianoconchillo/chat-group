import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";
import { UserAuth } from "../../../interfaces/User";

interface RequestBody {
    email: string;
    password: string;
}

export const register = createAsyncThunk(
    "auth/register",
    async (requestBody: RequestBody, thunkAPI) => {
        try {
            const { data } = await api.post<UserAuth>("/users", requestBody);
            localStorage.setItem("userAuth", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (requestBody: RequestBody, thunkAPI) => {
        try {
            const { data } = await api.post<UserAuth>(
                "/users/login",
                requestBody
            );
            localStorage.setItem("userAuth", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
