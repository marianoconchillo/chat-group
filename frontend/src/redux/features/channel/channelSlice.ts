import { createSlice } from "@reduxjs/toolkit";
import { Channel } from "../../../interfaces/Channel";
import { getAllChannels, newChannel } from "./channelServices";

interface ChannelState {
    channels: Channel[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ChannelState = {
    channels: [],
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
            state.channels.push(action.payload as Channel);
        });
        builder.addCase(newChannel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getAllChannels.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllChannels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.channels = action.payload as Channel[];
        });
        builder.addCase(getAllChannels.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
        });
    },
});
