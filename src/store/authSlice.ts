import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiConfig from "../api/config";
import axios from "axios";
import { AppDispatch } from ".";
import { RootState } from ".";

const { apiKey, authApi } = apiConfig

interface AuthSate {
    token: string | null
    expiration: string | null
    error: string | null
}

interface ApiResponse {
    idToken: string
    expiresIn: string
    localId: string
}

interface AuthData {
    email: string
    password: string
}

const initialState: AuthSate = {
    token: null,
    expiration: null,
    error: null,
}

export const signIn = createAsyncThunk<ApiResponse, AuthData, { dispatch: AppDispatch, rejectValue: string }>(
    'auth/signIn',
    async (userData, { dispatch, rejectWithValue }) => {
        const response = await axios.post(`${authApi}:signInWithPassword?key=${apiKey}`, { ...userData, returnSecureToken: true })
        const data = await response.data

        if (response.status !== 200) {
            return rejectWithValue(response.statusText)
        }

        dispatch(saveSession(data))
        return data
    }
)

export const signUp = createAsyncThunk<ApiResponse, AuthData, { dispatch: AppDispatch, rejectValue: string }>(
    'auth/signUp',
    async (userData, { dispatch, rejectWithValue }) => {
        const response = await axios.post(`${authApi}:signUp?key=${apiKey}`, { ...userData, returnSecureToken: true })
        const data = await response.data

        if (response.status !== 200) {
            return rejectWithValue(response.statusText)
        }

        dispatch(saveSession(data))
        return data
    }
)

export const autoLogout = createAsyncThunk<void, undefined, { dispatch: AppDispatch, state: RootState, rejectValue: string }>(
    "logoutSlice/autoLogout",
    async (_, { dispatch, rejectWithValue, getState }) => {
        const time = getState().authentication.expiration

        if (time !== null) {
            try {
                setTimeout(() => {
                    dispatch(closeSession())
                }, +time * 1_000)
            } catch (error) {
                return rejectWithValue(`${error}`)
            }
        }
    }
)

export const keepSession = createAsyncThunk<void, undefined, { dispatch: AppDispatch, rejectValue: string }>(
    'auth/keepSession',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const idToken = localStorage.getItem("token")
            const localId = localStorage.getItem("userId")
            const expiration = localStorage.getItem("expiration")

            if (!idToken && !localId && !expiration) {
                dispatch(closeSession())
            } else {
                if (idToken && localId && expiration) {
                    const expirationDate = new Date(expiration)

                    if (expirationDate <= new Date()) {
                        dispatch(closeSession())
                    } else {
                        //  TODO: fix bug with expires in value
                        dispatch(saveSession({ idToken, localId, expiresIn: String(3600) }))
                        dispatch(autoLogout())
                    }
                }

            }
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveSession: (state, action: PayloadAction<ApiResponse>) => {
            const expirationDate = new Date(new Date().getTime() + Number(action.payload.expiresIn) * 1_000)

            localStorage.setItem("token", action.payload.idToken)
            localStorage.setItem("userId", action.payload.localId)
            localStorage.setItem("expiration", String(expirationDate))

            state.token = action.payload.idToken
            state.expiration = action.payload.expiresIn
        },
        closeSession: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("expiration")

            state.token = null
            state.expiration = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.error = null
            })
            .addCase(signUp.pending, (state) => {
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                // ! debug
                console.log(action.payload);
            })
            .addCase(signUp.fulfilled, (state, action) => {
                // ! debug
                console.log(action.payload);
            })
            .addCase(keepSession.fulfilled, () => {
                // ! debug
                console.log('keep session');
            })
            .addCase(autoLogout.rejected, (state, action) => {
                console.error(action.payload);
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
            })
    },
})

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const { saveSession, closeSession } = authSlice.actions

export default authSlice.reducer