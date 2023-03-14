import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "../../../interfaces/User";
import { login, register } from "./authServices";

interface AuthState {
    userAuth: UserAuth | null;
    isLoading: boolean;
    error: string | null;
}

// Get user from localStorage
const userString = localStorage.getItem("userAuth");
const userAuth: UserAuth = userString ? JSON.parse(userString) : null;

const initialState: AuthState = {
    userAuth: userAuth,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        logout: (state) => {
            localStorage.removeItem("userAuth");
            state.userAuth = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userAuth = action.payload as UserAuth;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.userAuth = null;
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userAuth = action.payload as UserAuth;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.userAuth = null;
        });
    },
});

export const { logout } = authSlice.actions;
