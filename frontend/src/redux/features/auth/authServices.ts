import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from "firebase/auth";
import api from "../../../api/api";
import { UserAuth } from "../../../interfaces/User";
import { auth } from "../../../services/firebaseConfig";

interface RequestBody {
    email: string;
    password: string;
}

interface RequestBodyFirebase {
    email: string;
    displayName: string;
    phoneNumber: string;
    uid: string;
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

export const loginWithGoogle = createAsyncThunk(
    "auth/loginGoogle",
    async (_, thunkAPI) => {
        try {
            const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

            const { user }: UserCredential = await signInWithPopup(
                auth,
                googleProvider
            );

            const requestBody: RequestBodyFirebase = {
                displayName: user.displayName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                uid: user.uid,
            };

            const { data } = await api.post<UserAuth>(
                "/users/loginFirebase",
                requestBody
            );

            localStorage.setItem("userAuth", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const loginWithGithub = createAsyncThunk(
    "auth/loginGithub",
    async (_, thunkAPI) => {
        try {
            const githubProvider: GithubAuthProvider = new GithubAuthProvider();

            const { user }: UserCredential = await signInWithPopup(
                auth,
                githubProvider
            );

            const requestBody: RequestBodyFirebase = {
                displayName: user.displayName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                uid: user.uid,
            };

            const { data } = await api.post<UserAuth>(
                "/users/loginFirebase",
                requestBody
            );

            localStorage.setItem("userAuth", JSON.stringify(data));
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);
