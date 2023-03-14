import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../interfaces/User";
import { getMe, updateProfile } from "./userServices";

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

// Get user from localStorage
const userString = localStorage.getItem("user");
const user: User = userString ? JSON.parse(userString) : null;

const initialState: UserState = {
    user: user,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload as User;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.user = null;
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload as User;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.user = null;
        });
    },
});
