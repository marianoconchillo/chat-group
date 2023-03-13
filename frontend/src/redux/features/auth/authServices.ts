import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";
import { User } from "../../../interfaces/User";

interface RequestBody {
    email: string;
    password: string;
}

export const register = createAsyncThunk(
    "auth/register",
    async (requestBody: RequestBody, thunkAPI) => {
        try {
            const { data } = await api.post<User>("/users", requestBody);
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
