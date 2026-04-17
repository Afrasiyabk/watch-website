import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, thunkAPI) => {
    try {
        const res = await fetch(`${API_URL}/product/all`);
        const data = await res.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Fetch Products Failed");
    }
});

export const fetchProductById = createAsyncThunk('product/fetchProductById', async({ id }, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/product/${id}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Fetch Product By ID Failed");
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        error: null,
        loading: false,
        product: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {        
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || []; // Assuming the API response has a 'products' field
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product || null; // Assuming the API response has a 'product' field
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { setProducts, setError, setLoading } = productSlice.actions;
export default productSlice.reducer;