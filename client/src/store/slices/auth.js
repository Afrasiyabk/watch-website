import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const Signup = createAsyncThunk('user/register', async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/user/register`, formData);
        return res.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup Failed");
    }
});

export const Login = createAsyncThunk('user/login', async (formData, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/user/login`, formData);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Login Failed");
    }
});

export const Logout = () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        return true;
    } catch (error) {
        return thunkAPI.rejectWithValue("Logout Failed");
    }
};

export const authSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem('userData')) || null,
        token: localStorage.getItem('token') || null,
        error: null,
        loading: false,
        success: false
    },
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.success = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(Signup.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(Signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            });

    }
});

export const { resetStatus } = authSlice.actions;
export default authSlice.reducer;