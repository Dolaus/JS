import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import exp from "node:constants";
import {RootState} from "../store";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: null
}

interface UserRegister {
    username: string,
    password: string
}

export const login = createAsyncThunk(
    'user/login',
    async function (payload : UserRegister, {rejectWithValue}) {

        const responseLogin = await axiosInstance.post('http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/auth/login', {
            'username': payload.username,
            'password': payload.password
        })

        console.log(responseLogin.data.access_token);

        return responseLogin.data.access_token;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        register: (state, action) => {
            state.isAuthenticated = true;
        },
        removeToken: (state) => {
            state.token = null;
        },
        removeAuthenticate: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
            });
    },
})

export const { register, removeToken, removeAuthenticate } = userSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectToken = (state: RootState) => state.user.token;
export default userSlice.reducer