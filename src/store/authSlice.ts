import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiConfig from "../api/config";
import axios from "axios";

const { apiKey, authApi } = apiConfig

interface AuthSate {
    email: string | null
    token: string | null
    id: string | null
    error: string | null
}

interface ApiResponse {
    idToken: string
    email: string
    expiresIn: string
    localId: string
}

interface AuthData {
    email: string
    password: string
}

const initialState: AuthSate = {
    email: null,
    token: null,
    id: null,
    error: null
}

export const signIn = createAsyncThunk<ApiResponse, AuthData, { rejectValue: string }>(
    'auth/signIn',
    async (userData, { rejectWithValue }) => {
        const response = await axios.post(`${authApi}:signInWithPassword?key=${apiKey}`, { ...userData, returnSecureToken: true })
        const data = response.data

        if (response.status !== 200) {
            return rejectWithValue(response.statusText)
        }

        return data
    }
)

export const signUp = createAsyncThunk<ApiResponse, AuthData, { rejectValue: string }>(
    'auth/signUp',
    async (userData, { rejectWithValue }) => {
        const response = await axios.post(`${authApi}:signUp?key=${apiKey}`, { ...userData, returnSecureToken: true })
        const data = response.data

        if (response.status !== 200) {
            return rejectWithValue(response.statusText)
        }

        return data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                // ! debug
                console.log(action.payload);
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                // ! debug
                console.log(action.payload);
                state.error = null
            })
    },
})

export default authSlice.reducer