import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { channelSlice } from "./features/channel/channelSlice";
import { userSlice } from "./features/user/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        channel: channelSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
