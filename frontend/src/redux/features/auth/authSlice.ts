import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../interfaces/User";
import { register } from "./authServices";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

// Get user from localStorage
const userString = localStorage.getItem("user");
const user: User = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
    user: user,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload as User;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.user = null;
        });
    },
});
