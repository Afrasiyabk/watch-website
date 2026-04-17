import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';



export const fetchAllCategories = createAsyncThunk('category/all', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/category/all`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        return res.data;
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
    }
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;