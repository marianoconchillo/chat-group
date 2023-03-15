import { createSlice } from "@reduxjs/toolkit";
import { Channel } from "../../../interfaces/Channel";
import { newChannel } from "./channelServices";

interface ChannelState {
    channel: Channel | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ChannelState = {
    channel: null,
    isLoading: false,
    error: null,
};

export const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(newChannel.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(newChannel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.channel = action.payload as Channel;
        });
        builder.addCase(newChannel.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
            state.channel = null;
        });
    },
});
