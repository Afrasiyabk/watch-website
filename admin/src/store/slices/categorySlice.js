import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const categoryCreate = createAsyncThunk('category/create', async (form, thunkAPI) => {
    try {
        const res = await axios.post(`${API_URL}/category/create`, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Failed to create category");
    }
});

export const fetchAllCategories = createAsyncThunk('category/all', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/category/all`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const categoryDelete = createAsyncThunk('category/delete', async (id, thunkAPI) => {
    try {
        const res = await axios.delete(`${API_URL}/category/delete/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        });
        return { id, message: res.data.message };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: false,
        categories: [],
        error: null,
        success: false,
    },
    reducers: {
        resetCategoryState: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.categories = action.payload.cat;
            })
            .addCase(categoryCreate.pending, (state) => { state.loading = true; })
            .addCase(categoryCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories.push(action.payload.cat);
            })
            .addCase(categoryCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(categoryDelete.fulfilled, (state, action) => {
                state.categories = state.categories.filter(c => c._id !== action.payload.id);
            });
    }
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;